import { Router } from 'express';
import {
  markLunchHandler,
  getAllLunchHandler,
  getLunchByIdHandler,
  getLunchByTeacherHandler,
  getLunchByStudentHandler,
  updateLunchHandler,
  deleteLunchHandler,
  getLunchStatsHandler,
  getDailyLunchHandler,
  bulkMarkLunchHandler,
} from '../../controllers/lunch.controller';
import { authenticateToken, requireRole } from '../../middlewares/auth';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

// Mark lunch (create or update)
router.post('/', requireRole(['admin', 'teacher']), markLunchHandler);

// Bulk mark lunch
router.post('/bulk', requireRole(['admin', 'teacher']), bulkMarkLunchHandler);

// Get all lunch records with filters
router.get('/', getAllLunchHandler);

// Get lunch statistics
router.get('/stats', getLunchStatsHandler);

// Get daily lunch records
router.get('/daily/:date', getDailyLunchHandler);

// Get lunch records by teacher
router.get('/teacher/:teacherId', getLunchByTeacherHandler);

// Get lunch records by student
router.get('/student/:studentId', getLunchByStudentHandler);

// Get single lunch record by ID
router.get('/:id', getLunchByIdHandler);

// Update lunch record
router.put('/:id', requireRole(['admin', 'teacher']), updateLunchHandler);

// Delete lunch record
router.delete('/:id', requireRole(['admin']), deleteLunchHandler);

export default router;
