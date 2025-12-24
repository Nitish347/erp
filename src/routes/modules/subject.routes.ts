import { Router } from 'express';
import { authenticateToken, requireRole } from '../../middlewares/auth';
import * as subjectController from '../../controllers/subject.controller';

const router = Router();

router.use(authenticateToken);

// Create subject - Admins only
router.post(
    '/',
    requireRole(['admin']),
    subjectController.createSubjectHandler
);

// List subjects - All roles
router.get('/', subjectController.listSubjectsHandler);

// Get subject by ID - All roles
router.get('/:id', subjectController.getSubjectByIdHandler);

// Update subject - Teachers (assigned), Admins
router.put('/:id', subjectController.updateSubjectHandler);

// Delete subject - Admins only
router.delete(
    '/:id',
    requireRole(['admin']),
    subjectController.deleteSubjectHandler
);

export default router;
