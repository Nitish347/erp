import { Router } from 'express';
import {
  createTimetableHandler,
  deleteTimetableHandler,
  getTimetableByIdHandler,
  getAllTimetablesHandler,
  getTimetableByTeacherHandler,
  getTimetableByStudentHandler,
  updateTimetableHandler,
  getTimetableConflictsHandler
} from '../../controllers/timetable.controller';
import { authenticateToken, requireRole } from '../../middlewares/auth';

const router = Router();

// Public routes (require authentication)
router.get('/', authenticateToken, getAllTimetablesHandler);
router.get('/conflicts', authenticateToken, getTimetableConflictsHandler);
router.get('/teacher/:teacherId', authenticateToken, getTimetableByTeacherHandler);
router.get('/student/:studentId', authenticateToken, getTimetableByStudentHandler);
router.get('/:id', authenticateToken, getTimetableByIdHandler);

// Protected routes - Teacher timetables can only be updated by institutes
router.post('/teacher', authenticateToken, requireRole(['admin']), createTimetableHandler);
router.patch('/teacher/:id', authenticateToken, requireRole(['admin']), updateTimetableHandler);
router.delete('/teacher/:id', authenticateToken, requireRole(['admin']), deleteTimetableHandler);

// Protected routes - Student timetables can be managed by both teachers and institutes
router.post('/student', authenticateToken, requireRole(['teacher', 'admin']), createTimetableHandler);
router.patch('/student/:id', authenticateToken, requireRole(['teacher', 'admin']), updateTimetableHandler);
router.delete('/student/:id', authenticateToken, requireRole(['teacher', 'admin']), deleteTimetableHandler);

export default router;
