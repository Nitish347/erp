import { Router } from 'express';
import { authenticateToken, requireRole } from '../../middlewares/auth';
import * as feeController from '../../controllers/fee.controller';

const router = Router();

router.use(authenticateToken);

// Create fee - Admins only
router.post(
    '/',
    requireRole(['admin']),
    feeController.createFeeHandler
);

// List fees - All roles (filtered by role)
router.get('/', feeController.listFeesHandler);

// Get fee by ID - All roles (with access control)
router.get('/:id', feeController.getFeeByIdHandler);

// Update fee - Admins only
router.put(
    '/:id',
    requireRole(['admin']),
    feeController.updateFeeHandler
);

// Record payment - Students (own), Admins
router.post('/:id/payment', feeController.recordPaymentHandler);

export default router;
