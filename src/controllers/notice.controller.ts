import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import * as noticeService from '../services/notice.service';

export async function createNoticeHandler(req: AuthRequest, res: Response): Promise<void> {
    try {
        if (!['teacher', 'admin', 'super_admin'].includes(req.user?.role || '')) {
            res.status(403).json({ success: false, message: 'Only teachers and admins can create notices' });
            return;
        }

        req.body.issuedBy = req.user!.id;
        req.body.issuedByRole = req.user!.role === 'teacher' ? 'teacher' : 'admin';
        req.body.issuedDate = new Date();
        
        // Set instituteId from authenticated admin user
        if (req.user!.role === 'admin' || req.user!.role === 'super_admin') {
            req.body.instituteId = req.user!.id;
        }

        const notice = await noticeService.createNotice(req.body);
        res.status(201).json({ success: true, data: notice });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export async function listNoticesHandler(req: AuthRequest, res: Response): Promise<void> {
    try {
        const filter: any = {};

        if (req.user?.role === 'admin') {
            filter.instituteId = req.user.id;
        }

        if (req.query.instituteId && req.user?.role === 'super_admin') {
            filter.instituteId = req.query.instituteId;
        }

        const notices = await noticeService.listNotices(filter);
        res.json({ success: true, data: notices });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export async function getNoticeByIdHandler(req: AuthRequest, res: Response): Promise<void> {
    try {
        const notice = await noticeService.getNoticeById(req.params.id!);
        if (!notice) {
            res.status(404).json({ success: false, message: 'Notice not found' });
            return;
        }

        if (req.user?.role === 'admin' && notice.instituteId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }

        res.json({ success: true, data: notice });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export async function updateNoticeHandler(req: AuthRequest, res: Response): Promise<void> {
    try {
        const notice = await noticeService.getNoticeById(req.params.id!);
        if (!notice) {
            res.status(404).json({ success: false, message: 'Notice not found' });
            return;
        }

        // Only creator or admin can update
        if (req.user?.role === 'teacher' && notice.issuedBy?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'You can only update your own notices' });
            return;
        }
        if (req.user?.role === 'admin' && notice.instituteId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }

        const updated = await noticeService.updateNotice(req.params.id!, req.body);
        res.json({ success: true, data: updated });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export async function deleteNoticeHandler(req: AuthRequest, res: Response): Promise<void> {
    try {
        const notice = await noticeService.getNoticeById(req.params.id!);
        if (!notice) {
            res.status(404).json({ success: false, message: 'Notice not found' });
            return;
        }

        // Only creator or admin can delete
        if (req.user?.role === 'teacher' && notice.issuedBy?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'You can only delete your own notices' });
            return;
        }
        if (req.user?.role === 'admin' && notice.instituteId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }

        await noticeService.deleteNotice(req.params.id!);
        res.json({ success: true, message: 'Notice deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}
