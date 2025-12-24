import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import * as submissionService from '../services/homeworkSubmission.service';

export async function createSubmissionHandler(req: AuthRequest, res: Response): Promise<void> {
    try {
        // Only students can create submissions
        if (req.user?.role === 'student') {
            req.body.studentId = req.user.id;
            req.body.status = 'submitted';
            req.body.submittedAt = new Date();
        } else if (!['admin', 'institute', 'super_admin'].includes(req.user?.role || '')) {
            res.status(403).json({ success: false, message: 'Only students can create submissions' });
            return;
        }

        const submission = await submissionService.createSubmission(req.body);
        res.status(201).json({ success: true, data: submission });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export async function listSubmissionsHandler(req: AuthRequest, res: Response): Promise<void> {
    try {
        const filter: any = {};

        if (req.query.homeworkId) filter.homeworkId = req.query.homeworkId;
        if (req.query.status) filter.status = req.query.status;

        // Role-based filtering
        if (req.user?.role === 'student') {
            filter.studentId = req.user.id;
        }

        const submissions = await submissionService.listSubmissions(filter);
        res.json({ success: true, data: submissions });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export async function getSubmissionByIdHandler(req: AuthRequest, res: Response): Promise<void> {
    try {
        const submission = await submissionService.getSubmissionById(req.params.id!);
        if (!submission) {
            res.status(404).json({ success: false, message: 'Submission not found' });
            return;
        }

        // Verify access
        if (req.user?.role === 'student' && submission.studentId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }

        res.json({ success: true, data: submission });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export async function updateSubmissionHandler(req: AuthRequest, res: Response): Promise<void> {
    try {
        const submission = await submissionService.getSubmissionById(req.params.id!);
        if (!submission) {
            res.status(404).json({ success: false, message: 'Submission not found' });
            return;
        }

        // Students can only update their own pending submissions
        if (req.user?.role === 'student') {
            if (submission.studentId?.toString() !== req.user.id) {
                res.status(403).json({ success: false, message: 'Access denied' });
                return;
            }
            if (submission.status === 'graded') {
                res.status(403).json({ success: false, message: 'Cannot update graded submission' });
                return;
            }
        }

        const updated = await submissionService.updateSubmission(req.params.id!, req.body);
        res.json({ success: true, data: updated });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export async function gradeSubmissionHandler(req: AuthRequest, res: Response): Promise<void> {
    try {
        // Only teachers and admins can grade
        if (!['teacher', 'admin', 'institute', 'super_admin'].includes(req.user?.role || '')) {
            res.status(403).json({ success: false, message: 'Only teachers and admins can grade submissions' });
            return;
        }

        const { marksObtained, feedback } = req.body;
        const graded = await submissionService.gradeSubmission(req.params.id!, marksObtained, feedback);

        if (!graded) {
            res.status(404).json({ success: false, message: 'Submission not found' });
            return;
        }

        res.json({ success: true, data: graded });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
}
