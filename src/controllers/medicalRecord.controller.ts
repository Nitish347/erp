import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import * as medicalRecordService from '../services/medicalRecord.service';

export async function createRecordHandler(req: AuthRequest, res: Response): Promise<void> {
    try {
        if (!['admin', 'super_admin'].includes(req.user?.role || '')) {
            res.status(403).json({ success: false, message: 'Only admins can create medical records' });
            return;
        }

        const record = await medicalRecordService.createRecord(req.body);
        res.status(201).json({ success: true, data: record });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export async function listRecordsHandler(req: AuthRequest, res: Response): Promise<void> {
    try {
        const filter: any = {};

        if (req.query.userId) filter.userId = req.query.userId;
        if (req.user?.role === 'admin') {
            filter.instituteId = req.user.id;
        }

        // Students can only see their own records
        if (req.user?.role === 'student') {
            filter.userId = req.user.id;
        }

        const records = await medicalRecordService.listRecords(filter);
        res.json({ success: true, data: records });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export async function getRecordByIdHandler(req: AuthRequest, res: Response): Promise<void> {
    try {
        const record = await medicalRecordService.getRecordById(req.params.id!);
        if (!record) {
            res.status(404).json({ success: false, message: 'Medical record not found' });
            return;
        }

        // Students can only view their own records
        if (req.user?.role === 'student' && record.userId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }
        if (req.user?.role === 'admin' && record.instituteId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }

        res.json({ success: true, data: record });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export async function updateRecordHandler(req: AuthRequest, res: Response): Promise<void> {
    try {
        if (!['admin', 'super_admin'].includes(req.user?.role || '')) {
            res.status(403).json({ success: false, message: 'Only admins can update medical records' });
            return;
        }

        const record = await medicalRecordService.getRecordById(req.params.id!);
        if (!record) {
            res.status(404).json({ success: false, message: 'Medical record not found' });
            return;
        }

        if (req.user!.role === 'admin' && record.instituteId?.toString() !== req.user!.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }

        const updated = await medicalRecordService.updateRecord(req.params.id!, req.body);
        res.json({ success: true, data: updated });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export async function deleteRecordHandler(req: AuthRequest, res: Response): Promise<void> {
    try {
        if (!['admin', 'super_admin'].includes(req.user?.role || '')) {
            res.status(403).json({ success: false, message: 'Only admins can delete medical records' });
            return;
        }

        const record = await medicalRecordService.getRecordById(req.params.id!);
        if (!record) {
            res.status(404).json({ success: false, message: 'Medical record not found' });
            return;
        }

        if (req.user!.role === 'admin' && record.instituteId?.toString() !== req.user!.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }

        await medicalRecordService.deleteRecord(req.params.id!);
        res.json({ success: true, message: 'Medical record deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}
