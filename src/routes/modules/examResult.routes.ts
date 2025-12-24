import { Router } from 'express';
import { authenticateToken, requireRole } from '../../middlewares/auth';
import * as resultController from '../../controllers/examResult.controller';

const router = Router();

router.use(authenticateToken);

// Create result - Teachers, Admins
router.post(
    '/',
    requireRole(['teacher', 'admin']),
    resultController.createResultHandler
);

// List results - All roles (filtered by role)
router.get('/', resultController.listResultsHandler);

// Get result by ID - All roles (with access control)
router.get('/:id', resultController.getResultByIdHandler);

// Update result - Teachers, Admins
router.put(
    '/:id',
    requireRole(['teacher', 'admin']),
    resultController.updateResultHandler
);

// Delete result - Admins only
router.delete(
    '/:id',
    requireRole(['admin']),
    resultController.deleteResultHandler
);

export default router;
