import { Router } from 'express';
import { authenticateToken, requireRole } from '../../middlewares/auth';
import * as homeworkController from '../../controllers/homework.controller';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

// Create homework - Teachers, Admins, Institutes
router.post(
    '/',
    requireRole(['teacher', 'admin']),
    homeworkController.createHomeworkHandler
);

// List homework - All roles
router.get('/', homeworkController.listHomeworkHandler);

// Get homework by ID - All roles
router.get('/:id', homeworkController.getHomeworkByIdHandler);

// Update homework - Teachers (own), Admins, Institutes
router.put(
    '/:id',
    requireRole(['teacher', 'admin']),
    homeworkController.updateHomeworkHandler
);

// Delete homework - Teachers (own), Admins, Institutes
router.delete(
    '/:id',
    requireRole(['teacher', 'admin']),
    homeworkController.deleteHomeworkHandler
);

export default router;
