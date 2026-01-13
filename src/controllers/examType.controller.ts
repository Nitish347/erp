import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import * as examTypeService from '../services/examType.service';

export async function createExamTypeHandler(req: AuthRequest, res: Response): Promise<void> {
    try {
        if (!['admin', 'super_admin'].includes(req.user?.role || '')) {
            res.status(403).json({ success: false, message: 'Only admins can create exam types' });
            return;
        }

        // Automatically set instituteId from authenticated user
        req.body.instituteId = req.user!.id;

        const examType = await examTypeService.createExamType(req.body);
        res.status(201).json({ success: true, data: examType });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export async function listExamTypesHandler(req: AuthRequest, res: Response): Promise<void> {
    try {
        const filter: any = {};

        // Filter by institute for admins
        if (req.user?.role === 'admin' || req.user?.role === 'super_admin') {
            filter.instituteId = req.user.id;
        }

        // Optional filters
        if (req.query.isActive !== undefined) {
            filter.isActive = req.query.isActive === 'true';
        }

        const examTypes = await examTypeService.listExamTypes(filter);
        res.json({ success: true, data: examTypes });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export async function getExamTypeByIdHandler(req: AuthRequest, res: Response): Promise<void> {
    try {
        const examType = await examTypeService.getExamTypeById(req.params.id!);
        if (!examType) {
            res.status(404).json({ success: false, message: 'Exam type not found' });
            return;
        }

        // Check access
        if (req.user?.role === 'admin' && examType.instituteId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }

        res.json({ success: true, data: examType });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export async function updateExamTypeHandler(req: AuthRequest, res: Response): Promise<void> {
    try {
        const examType = await examTypeService.getExamTypeById(req.params.id!);
        if (!examType) {
            res.status(404).json({ success: false, message: 'Exam type not found' });
            return;
        }

        // Check access
        if (req.user?.role === 'admin' && examType.instituteId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }

        const updated = await examTypeService.updateExamType(req.params.id!, req.body);
        res.json({ success: true, data: updated });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export async function deleteExamTypeHandler(req: AuthRequest, res: Response): Promise<void> {
    try {
        const examType = await examTypeService.getExamTypeById(req.params.id!);
        if (!examType) {
            res.status(404).json({ success: false, message: 'Exam type not found' });
            return;
        }

        // Check access
        if (req.user?.role === 'admin' && examType.instituteId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }

        await examTypeService.deleteExamType(req.params.id!);
        res.json({ success: true, message: 'Exam type deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}
