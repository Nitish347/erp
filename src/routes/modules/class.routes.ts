import { Router } from 'express';
import { authenticateToken, requireRole } from '../../middlewares/auth';
import * as classController from '../../controllers/class.controller';

const router = Router();

router.use(authenticateToken);

// Create class - Admins only
router.post(
    '/',
    requireRole(['admin']),
    classController.createClassHandler
);

// List classes - All roles
router.get('/', classController.listClassesHandler);

// Get class by ID - All roles
router.get('/:id', classController.getClassByIdHandler);

// Update class - Admins only
router.put(
    '/:id',
    requireRole(['admin']),
    classController.updateClassHandler
);

// Delete class - Admins only
router.delete(
    '/:id',
    requireRole(['admin']),
    classController.deleteClassHandler
);

export default router;
