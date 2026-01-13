import { Router } from 'express';
import { authenticateToken, requireRole } from '../../middlewares/auth';
import * as examTypeController from '../../controllers/examType.controller';

const router = Router();

router.use(authenticateToken);

// Create exam type - Admins only
router.post(
    '/',
    requireRole(['admin', 'super_admin']),
    examTypeController.createExamTypeHandler
);

// List exam types - All roles
router.get('/', examTypeController.listExamTypesHandler);

// Get exam type by ID - All roles
router.get('/:id', examTypeController.getExamTypeByIdHandler);

// Update exam type - Admins only
router.put(
    '/:id',
    requireRole(['admin', 'super_admin']),
    examTypeController.updateExamTypeHandler
);

// Delete exam type - Admins only
router.delete(
    '/:id',
    requireRole(['admin', 'super_admin']),
    examTypeController.deleteExamTypeHandler
);

export default router;
