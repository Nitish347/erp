import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import * as homeworkService from '../services/homework.service';
import { HomeworkModel } from '../models/Homework.model';

export async function createHomeworkHandler(req: AuthRequest, res: Response): Promise<void> {
    try {
        // Only teachers, admins, and super_admins can create homework
        if (!req.user || !['teacher', 'admin', 'super_admin'].includes(req.user.role)) {
            res.status(403).json({ success: false, message: 'Only teachers and admins can create homework' });
            return;
        }

        // If teacher, set teacherId automatically
        if (req.user.role === 'teacher') {
            req.body.teacherId = req.user.id;
        }

        const homework = await homeworkService.createHomework(req.body);
        res.status(201).json({ success: true, data: homework });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export async function listHomeworkHandler(req: AuthRequest, res: Response): Promise<void> {
    try {
        const filter: any = {};

        // Apply role-based filtering
        if (req.user?.role === 'admin') {
            filter.instituteId = req.user.id;
        } else if (req.user?.role === 'teacher') {
            filter.teacherId = req.user.id;
        } else if (req.user?.role === 'student') {
            // Students see homework assigned to them
            const { classId, section } = req.query;
            if (classId && section) {
                filter.classId = classId;
                filter.section = section;
            }
        }

        // Apply query filters
        if (req.query.classId && req.user?.role !== 'student') filter.classId = req.query.classId;
        if (req.query.section) filter.section = req.query.section;
        if (req.query.subject) filter.subject = req.query.subject;

        const homework = await homeworkService.listHomework(filter);
        res.json({ success: true, data: homework });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export async function getHomeworkByIdHandler(req: AuthRequest, res: Response): Promise<void> {
    try {
        const homework = await homeworkService.getHomeworkById(req.params.id!);
        if (!homework) {
            res.status(404).json({ success: false, message: 'Homework not found' });
            return;
        }

        // Verify access rights
        if (req.user?.role === 'admin' && homework.instituteId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }
        if (req.user?.role === 'teacher' && homework.teacherId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }

        res.json({ success: true, data: homework });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export async function updateHomeworkHandler(req: AuthRequest, res: Response): Promise<void> {
    try {
        const homework = await homeworkService.getHomeworkById(req.params.id!);
        if (!homework) {
            res.status(404).json({ success: false, message: 'Homework not found' });
            return;
        }

        // Verify ownership
        if (req.user?.role === 'teacher' && homework.teacherId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'You can only update your own homework' });
            return;
        }
        if (req.user?.role === 'admin' && homework.instituteId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }

        const updated = await homeworkService.updateHomework(req.params.id!, req.body);
        res.json({ success: true, data: updated });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export async function deleteHomeworkHandler(req: AuthRequest, res: Response): Promise<void> {
    try {
        const homework = await homeworkService.getHomeworkById(req.params.id!);
        if (!homework) {
            res.status(404).json({ success: false, message: 'Homework not found' });
            return;
        }

        // Verify ownership
        if (req.user?.role === 'teacher' && homework.teacherId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'You can only delete your own homework' });
            return;
        }
        if (req.user?.role === 'admin' && homework.instituteId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }

        await homeworkService.deleteHomework(req.params.id!);
        res.json({ success: true, message: 'Homework deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}
