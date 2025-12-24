import { Router } from 'express';
import { authenticateToken, requireRole } from '../../middlewares/auth';
import * as examController from '../../controllers/exam.controller';

const router = Router();

router.use(authenticateToken);

// Create exam - Teachers, Admins
router.post(
    '/',
    requireRole(['teacher', 'admin']),
    examController.createExamHandler
);

// List exams - All roles
router.get('/', examController.listExamsHandler);

// Get exam by ID - All roles
router.get('/:id', examController.getExamByIdHandler);

// Update exam - Teachers (own), Admins
router.put(
    '/:id',
    requireRole(['teacher', 'admin']),
    examController.updateExamHandler
);

// Delete exam - Teachers (own), Admins
router.delete(
    '/:id',
    requireRole(['teacher', 'admin']),
    examController.deleteExamHandler
);

export default router;
