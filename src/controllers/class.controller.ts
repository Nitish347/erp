import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import * as classService from '../services/class.service';

export async function createClassHandler(req: AuthRequest, res: Response): Promise<void> {
    try {
        if (!['admin', 'super_admin'].includes(req.user?.role || '')) {
            res.status(403).json({ success: false, message: 'Only admins can create classes' });
            return;
        }


        const classDataToCreate = {
            ...req.body,
            instituteId: req.user?.id
        };

        const classData = await classService.createClass(classDataToCreate);
        res.status(201).json({ success: true, data: classData });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export async function listClassesHandler(req: AuthRequest, res: Response): Promise<void> {
    try {
        const filter: any = {};

        if (req.user?.role === 'admin') {
            filter.instituteId = req.user.id;
        }
        if (req.query.instituteId && req.user?.role === 'super_admin') {
            filter.instituteId = req.query.instituteId;
        }
        if (req.query.grade) filter.grade = req.query.grade;

        const classes = await classService.listClasses(filter);
        res.json({ success: true, data: classes });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export async function getClassByIdHandler(req: AuthRequest, res: Response): Promise<void> {
    try {
        const classData = await classService.getClassById(req.params.id!);
        if (!classData) {
            res.status(404).json({ success: false, message: 'Class not found' });
            return;
        }

        if (req.user?.role === 'admin' && classData.instituteId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }

        res.json({ success: true, data: classData });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export async function updateClassHandler(req: AuthRequest, res: Response): Promise<void> {
    try {
        if (!['admin', 'super_admin'].includes(req.user?.role || '')) {
            res.status(403).json({ success: false, message: 'Only admins can update classes' });
            return;
        }

        const classData = await classService.getClassById(req.params.id!);
        if (!classData) {
            res.status(404).json({ success: false, message: 'Class not found' });
            return;
        }

        if (req.user?.role === 'admin' && classData.instituteId?.toString() !== req.user?.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }

        const updated = await classService.updateClass(req.params.id!, req.body);
        res.json({ success: true, data: updated });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export async function deleteClassHandler(req: AuthRequest, res: Response): Promise<void> {
    try {
        if (!['admin', 'super_admin'].includes(req.user?.role || '')) {
            res.status(403).json({ success: false, message: 'Only admins can delete classes' });
            return;
        }

        const classData = await classService.getClassById(req.params.id!);
        if (!classData) {
            res.status(404).json({ success: false, message: 'Class not found' });
            return;
        }

        if (req.user?.role === 'admin' && classData.instituteId?.toString() !== req.user?.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }

        await classService.deleteClass(req.params.id!);
        res.json({ success: true, message: 'Class deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export async function addSectionHandler(req: AuthRequest, res: Response): Promise<void> {
    try {
        if (!['admin', 'super_admin'].includes(req.user?.role || '')) {
            res.status(403).json({ success: false, message: 'Only admins can add sections' });
            return;
        }

        const { section } = req.body;
        if (!section) {
            res.status(400).json({ success: false, message: 'Section is required' });
            return;
        }

        const classData = await classService.getClassById(req.params.id!);
        if (!classData) {
            res.status(404).json({ success: false, message: 'Class not found' });
            return;
        }

        if (req.user?.role === 'admin' && classData.instituteId?.toString() !== req.user?.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }

        const updated = await classService.addSection(req.params.id!, section);
        res.json({ success: true, data: updated });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
}
