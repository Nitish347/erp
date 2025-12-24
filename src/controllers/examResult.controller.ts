import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import * as resultService from '../services/examResult.service';

export async function createResultHandler(req: AuthRequest, res: Response): Promise<void> {
    try {
        if (!['teacher', 'admin', 'institute', 'super_admin'].includes(req.user?.role || '')) {
            res.status(403).json({ success: false, message: 'Only teachers and admins can create results' });
            return;
        }

        const result = await resultService.createResult(req.body);
        res.status(201).json({ success: true, data: result });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export async function listResultsHandler(req: AuthRequest, res: Response): Promise<void> {
    try {
        const filter: any = {};

        if (req.query.examId) filter.examId = req.query.examId;
        if (req.query.studentId) filter.studentId = req.query.studentId;

        // Students can only see their own results
        if (req.user?.role === 'student') {
            filter.studentId = req.user.id;
        }

        const results = await resultService.listResults(filter);
        res.json({ success: true, data: results });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export async function getResultByIdHandler(req: AuthRequest, res: Response): Promise<void> {
    try {
        const result = await resultService.getResultById(req.params.id!);
        if (!result) {
            res.status(404).json({ success: false, message: 'Result not found' });
            return;
        }

        // Students can only view their own results
        if (req.user?.role === 'student' && result.studentId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }

        res.json({ success: true, data: result });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export async function updateResultHandler(req: AuthRequest, res: Response): Promise<void> {
    try {
        if (!['teacher', 'admin', 'institute', 'super_admin'].includes(req.user?.role || '')) {
            res.status(403).json({ success: false, message: 'Only teachers and admins can update results' });
            return;
        }

        const updated = await resultService.updateResult(req.params.id!, req.body);
        if (!updated) {
            res.status(404).json({ success: false, message: 'Result not found' });
            return;
        }

        res.json({ success: true, data: updated });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export async function deleteResultHandler(req: AuthRequest, res: Response): Promise<void> {
    try {
        if (!['admin', 'institute', 'super_admin'].includes(req.user?.role || '')) {
            res.status(403).json({ success: false, message: 'Only admins can delete results' });
            return;
        }

        const deleted = await resultService.deleteResult(req.params.id!);
        if (!deleted) {
            res.status(404).json({ success: false, message: 'Result not found' });
            return;
        }

        res.json({ success: true, message: 'Result deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export async function getStudentResultsHandler(req: AuthRequest, res: Response): Promise<void> {
    try {
        const studentId = req.params.studentId;

        // Students can only view their own results
        if (req.user?.role === 'student' && studentId !== req.user.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }

        const results = await resultService.getStudentResults(studentId!);
        res.json({ success: true, data: results });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}
