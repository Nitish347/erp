import { Router } from 'express';
import { authenticateToken, requireRole } from '../../middlewares/auth';
import * as submissionController from '../../controllers/homeworkSubmission.controller';

const router = Router();

router.use(authenticateToken);

// Create submission - Students, Admins
router.post(
    '/',
    requireRole(['student', 'admin']),
    submissionController.createSubmissionHandler
);

// List submissions - All roles (filtered by role)
router.get('/', submissionController.listSubmissionsHandler);

// Get submission by ID - All roles (with access control)
router.get('/:id', submissionController.getSubmissionByIdHandler);

// Update submission - Students (own), Teachers, Admins
router.put('/:id', submissionController.updateSubmissionHandler);

// Grade submission - Teachers, Admins
router.post(
    '/:id/grade',
    requireRole(['teacher', 'admin']),
    submissionController.gradeSubmissionHandler
);

export default router;
