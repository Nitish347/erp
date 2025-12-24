import { Router } from 'express';
import { authenticateToken, requireRole } from '../../middlewares/auth';
import * as medicalRecordController from '../../controllers/medicalRecord.controller';

const router = Router();

router.use(authenticateToken);

// Create medical record - Admins only
router.post(
    '/',
    requireRole(['admin']),
    medicalRecordController.createRecordHandler
);

// List medical records - All roles (filtered by role)
router.get('/', medicalRecordController.listRecordsHandler);

// Get medical record by ID - All roles (with access control)
router.get('/:id', medicalRecordController.getRecordByIdHandler);

// Update medical record - Admins only
router.put(
    '/:id',
    requireRole(['admin']),
    medicalRecordController.updateRecordHandler
);

// Delete medical record - Admins only
router.delete(
    '/:id',
    requireRole(['admin']),
    medicalRecordController.deleteRecordHandler
);

export default router;
