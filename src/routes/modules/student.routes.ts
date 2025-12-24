import { Router } from 'express';
import {
  createStudentHandler,
  deleteStudentHandler,
  getStudentByIdHandler,
  listStudentsHandler,
  updateStudentHandler,
} from '../../controllers/student.controller';
import { authenticateToken, requireRole } from '../../middlewares/auth';

const router = Router();

// Protected routes - require authentication
// Admins can manage students, teachers can update/delete their own students
router.post('/', authenticateToken, requireRole(['admin']), createStudentHandler);
router.get('/', authenticateToken, listStudentsHandler);
router.get('/:id', authenticateToken, getStudentByIdHandler);
router.patch('/:id', authenticateToken, requireRole(['admin']), updateStudentHandler);
router.delete('/:id', authenticateToken, requireRole(['admin']), deleteStudentHandler);

export default router;


