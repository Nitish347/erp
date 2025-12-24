import { Router } from 'express';
import {
  markAttendanceHandler,
  deleteAttendanceHandler,
  getAttendanceByIdHandler,
  getAllAttendanceHandler,
  getAttendanceByTeacherHandler,
  getAttendanceByStudentHandler,
  updateAttendanceHandler,
  getAttendanceStatsHandler,
  getDailyAttendanceHandler,
  bulkMarkAttendanceHandler
} from '../../controllers/attendance.controller';
import { authenticateToken, requireRole } from '../../middlewares/auth';

const router = Router();

// Public routes (require authentication)
router.get('/', authenticateToken, getAllAttendanceHandler);
router.get('/stats', authenticateToken, getAttendanceStatsHandler);
router.get('/daily/:date', authenticateToken, getDailyAttendanceHandler);
router.get('/teacher/:teacherId', authenticateToken, getAttendanceByTeacherHandler);
router.get('/student/:studentId', authenticateToken, getAttendanceByStudentHandler);
router.get('/:id', authenticateToken, getAttendanceByIdHandler);

// Protected routes - Attendance can be managed by teachers and admins
router.post('/', authenticateToken, requireRole(['teacher', 'admin']), markAttendanceHandler);
router.post('/bulk', authenticateToken, requireRole(['teacher', 'admin']), bulkMarkAttendanceHandler);
router.patch('/:id', authenticateToken, requireRole(['teacher', 'admin']), updateAttendanceHandler);
router.delete('/:id', authenticateToken, requireRole(['teacher', 'admin']), deleteAttendanceHandler);

export default router;
