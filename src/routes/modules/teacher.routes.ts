import { Router } from 'express';
import {
  createTeacherHandler,
  deleteTeacherHandler,
  getTeacherByIdHandler,
  listTeachersHandler,
  updateTeacherHandler,
  listStudentsByTeacherHandler,
  getStudentByTeacherHandler,
} from '../../controllers/teacher.controller';
import { authenticateToken, requireRole } from '../../middlewares/auth';

const router = Router();

// Protected routes - require authentication
// Admins and institutes can manage teachers
router.post('/', authenticateToken, requireRole(['admin']), createTeacherHandler);
router.get('/', authenticateToken, listTeachersHandler);

// Teacher managing students (uses authenticated teacher's ID from context)
// These routes must come before /:id to avoid route conflicts
router.get('/students', authenticateToken, requireRole(['teacher']), listStudentsByTeacherHandler);
router.get('/students/:studentId', authenticateToken, requireRole(['teacher']), getStudentByTeacherHandler);

// Teacher CRUD operations (must come after specific routes)
router.get('/:id', authenticateToken, getTeacherByIdHandler);
router.patch('/:id', authenticateToken, requireRole(['admin']), updateTeacherHandler);
router.delete('/:id', authenticateToken, requireRole(['admin']), deleteTeacherHandler);

export default router;


