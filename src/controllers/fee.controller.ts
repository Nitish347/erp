import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import * as feeService from '../services/fee.service';

export async function createFeeHandler(req: AuthRequest, res: Response): Promise<void> {
    try {
        if (!['admin', 'super_admin'].includes(req.user?.role || '')) {
            res.status(403).json({ success: false, message: 'Only admins can create fees' });
            return;
        }

        const fee = await feeService.createFee(req.body);
        res.status(201).json({ success: true, data: fee });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export async function listFeesHandler(req: AuthRequest, res: Response): Promise<void> {
    try {
        const filter: any = {};

        if (req.user?.role === 'admin') {
            filter.instituteId = req.user.id;
        }
        if (req.user?.role === 'student') {
            filter.studentId = req.user.id;
        }

        if (req.query.studentId && req.user?.role !== 'student') {
            filter.studentId = req.query.studentId;
        }
        if (req.query.status) filter.status = req.query.status;

        const fees = await feeService.listFees(filter);
        res.json({ success: true, data: fees });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export async function getFeeByIdHandler(req: AuthRequest, res: Response): Promise<void> {
    try {
        const fee = await feeService.getFeeById(req.params.id!);
        if (!fee) {
            res.status(404).json({ success: false, message: 'Fee not found' });
            return;
        }

        // Students can only view their own fees
        if (req.user?.role === 'student' && fee.studentId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }
        if (req.user?.role === 'admin' && fee.instituteId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }

        res.json({ success: true, data: fee });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export async function updateFeeHandler(req: AuthRequest, res: Response): Promise<void> {
    try {
        if (!['admin', 'super_admin'].includes(req.user?.role || '')) {
            res.status(403).json({ success: false, message: 'Only admins can update fees' });
            return;
        }

        const fee = await feeService.getFeeById(req.params.id!);
        if (!fee) {
            res.status(404).json({ success: false, message: 'Fee not found' });
            return;
        }

        if (req.user!.role === 'admin' && fee.instituteId?.toString() !== req.user!.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }

        const updated = await feeService.updateFee(req.params.id!, req.body);
        res.json({ success: true, data: updated });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export async function recordPaymentHandler(req: AuthRequest, res: Response): Promise<void> {
    try {
        const fee = await feeService.getFeeById(req.params.id!);
        if (!fee) {
            res.status(404).json({ success: false, message: 'Fee not found' });
            return;
        }

        // Students can pay their own fees
        if (req.user?.role === 'student' && fee.studentId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }
        if (req.user?.role === 'admin' && fee.instituteId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }

        const { paidAmount, paymentMethod, transactionId } = req.body;
        const updated = await feeService.recordPayment(req.params.id!, {
            paidAmount,
            paymentMethod,
            transactionId,
        });

        if (!updated) {
            res.status(404).json({ success: false, message: 'Fee not found' });
            return;
        }

        res.json({ success: true, data: updated });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
}
