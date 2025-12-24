import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import * as examService from '../services/exam.service';

export async function createExamHandler(req: AuthRequest, res: Response): Promise<void> {
    try {
        if (!['teacher', 'admin', 'super_admin'].includes(req.user?.role || '')) {
            res.status(403).json({ success: false, message: 'Only teachers and admins can create exams' });
            return;
        }

        if (req.user!.role === 'teacher') {
            req.body.teacherId = req.user!.id;
        }

        const exam = await examService.createExam(req.body);
        res.status(201).json({ success: true, data: exam });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export async function listExamsHandler(req: AuthRequest, res: Response): Promise<void> {
    try {
        const filter: any = {};

        if (req.user?.role === 'admin') {
            filter.instituteId = req.user.id;
        } else if (req.user?.role === 'teacher') {
            filter.teacherId = req.user.id;
        }

        if (req.query.classId) filter.classId = req.query.classId;
        if (req.query.section) filter.section = req.query.section;
        if (req.query.subject) filter.subject = req.query.subject;

        const exams = await examService.listExams(filter);
        res.json({ success: true, data: exams });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export async function getExamByIdHandler(req: AuthRequest, res: Response): Promise<void> {
    try {
        const exam = await examService.getExamById(req.params.id!);
        if (!exam) {
            res.status(404).json({ success: false, message: 'Exam not found' });
            return;
        }

        if (req.user?.role === 'admin' && exam.instituteId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }
        if (req.user?.role === 'teacher' && exam.teacherId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }

        res.json({ success: true, data: exam });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export async function updateExamHandler(req: AuthRequest, res: Response): Promise<void> {
    try {
        const exam = await examService.getExamById(req.params.id!);
        if (!exam) {
            res.status(404).json({ success: false, message: 'Exam not found' });
            return;
        }

        if (req.user?.role === 'teacher' && exam.teacherId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'You can only update your own exams' });
            return;
        }
        if (req.user?.role === 'admin' && exam.instituteId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }

        const updated = await examService.updateExam(req.params.id!, req.body);
        res.json({ success: true, data: updated });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export async function deleteExamHandler(req: AuthRequest, res: Response): Promise<void> {
    try {
        const exam = await examService.getExamById(req.params.id!);
        if (!exam) {
            res.status(404).json({ success: false, message: 'Exam not found' });
            return;
        }

        if (req.user?.role === 'teacher' && exam.teacherId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'You can only delete your own exams' });
            return;
        }
        if (req.user?.role === 'admin' && exam.instituteId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }

        await examService.deleteExam(req.params.id!);
        res.json({ success: true, message: 'Exam deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}
