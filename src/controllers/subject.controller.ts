import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import * as subjectService from '../services/subject.service';

export async function createSubjectHandler(req: AuthRequest, res: Response): Promise<void> {
    try {
        if (!['admin', 'super_admin'].includes(req.user?.role || '')) {
            res.status(403).json({ success: false, message: 'Only admins can create subjects' });
            return;
        }

        const subject = await subjectService.createSubject(req.body);
        res.status(201).json({ success: true, data: subject });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export async function listSubjectsHandler(req: AuthRequest, res: Response): Promise<void> {
    try {
        const filter: any = {};

        if (req.user?.role === 'admin') {
            filter.instituteId = req.user.id;
        }
        if (req.query.classId) filter.classId = req.query.classId;
        if (req.query.teacherId) filter.teacherId = req.query.teacherId;

        const subjects = await subjectService.listSubjects(filter);
        res.json({ success: true, data: subjects });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export async function getSubjectByIdHandler(req: AuthRequest, res: Response): Promise<void> {
    try {
        const subject = await subjectService.getSubjectById(req.params.id!);
        if (!subject) {
            res.status(404).json({ success: false, message: 'Subject not found' });
            return;
        }

        if (req.user?.role === 'admin' && subject.instituteId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }

        res.json({ success: true, data: subject });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export async function updateSubjectHandler(req: AuthRequest, res: Response): Promise<void> {
    try {
        const subject = await subjectService.getSubjectById(req.params.id!);
        if (!subject) {
            res.status(404).json({ success: false, message: 'Subject not found' });
            return;
        }

        // Teachers can update their assigned subjects
        if (req.user?.role === 'teacher' && subject.teacherId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'You can only update your assigned subjects' });
            return;
        }
        if (req.user?.role === 'admin' && subject.instituteId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }

        const updated = await subjectService.updateSubject(req.params.id!, req.body);
        res.json({ success: true, data: updated });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export async function deleteSubjectHandler(req: AuthRequest, res: Response): Promise<void> {
    try {
        if (!['admin', 'super_admin'].includes(req.user?.role || '')) {
            res.status(403).json({ success: false, message: 'Only admins can delete subjects' });
            return;
        }

        const subject = await subjectService.getSubjectById(req.params.id!);
        if (!subject) {
            res.status(404).json({ success: false, message: 'Subject not found' });
            return;
        }

        if (req.user?.role === 'admin' && subject.instituteId?.toString() !== req.user?.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }

        await subjectService.deleteSubject(req.params.id!);
        res.json({ success: true, message: 'Subject deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}
