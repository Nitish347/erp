import { Router } from 'express';
import {
  getDashboardStatsHandler,
  listAllSchoolsHandler,
  getSchoolDetailsHandler,
  updateSchoolHandler,
  deleteSchoolHandler,
  getAllStudentsHandler,
  getSchoolStudentsHandler,
  createSchoolStudentHandler,
  updateStudentHandler,
  deleteStudentHandler,
  getAllTeachersHandler,
  getSchoolTeachersHandler,
  createSchoolTeacherHandler,
  updateTeacherHandler,
  deleteTeacherHandler,
  getSchoolClassesHandler,
  getSchoolAttendanceHandler,
  getSchoolExamsHandler,
  getSchoolFeesHandler,
  getSchoolHomeworkHandler,
  getSchoolNoticesHandler,
  getSchoolTimetablesHandler,
  getSchoolMedicalRecordsHandler,
} from '../../controllers/super-admin.controller';
import { authenticateToken, requireRole } from '../../middlewares/auth';

const router = Router();

// All routes require super_admin role
const superAdminOnly = requireRole(['super_admin']);

// Dashboard
router.get('/dashboard/stats', authenticateToken, superAdminOnly, getDashboardStatsHandler);

// School Management
router.get('/schools', authenticateToken, superAdminOnly, listAllSchoolsHandler);
router.get('/schools/:id', authenticateToken, superAdminOnly, getSchoolDetailsHandler);
router.patch('/schools/:id', authenticateToken, superAdminOnly, updateSchoolHandler);
router.delete('/schools/:id', authenticateToken, superAdminOnly, deleteSchoolHandler);

// Student Management - All Students
router.get('/students', authenticateToken, superAdminOnly, getAllStudentsHandler);
router.patch('/students/:id', authenticateToken, superAdminOnly, updateStudentHandler);
router.delete('/students/:id', authenticateToken, superAdminOnly, deleteStudentHandler);

// Student Management - By School
router.get('/schools/:schoolId/students', authenticateToken, superAdminOnly, getSchoolStudentsHandler);
router.post('/schools/:schoolId/students', authenticateToken, superAdminOnly, createSchoolStudentHandler);

// Teacher Management - All Teachers
router.get('/teachers', authenticateToken, superAdminOnly, getAllTeachersHandler);
router.patch('/teachers/:id', authenticateToken, superAdminOnly, updateTeacherHandler);
router.delete('/teachers/:id', authenticateToken, superAdminOnly, deleteTeacherHandler);

// Teacher Management - By School
router.get('/schools/:schoolId/teachers', authenticateToken, superAdminOnly, getSchoolTeachersHandler);
router.post('/schools/:schoolId/teachers', authenticateToken, superAdminOnly, createSchoolTeacherHandler);

// Resource Management - By School
router.get('/schools/:schoolId/classes', authenticateToken, superAdminOnly, getSchoolClassesHandler);
router.get('/schools/:schoolId/attendance', authenticateToken, superAdminOnly, getSchoolAttendanceHandler);
router.get('/schools/:schoolId/exams', authenticateToken, superAdminOnly, getSchoolExamsHandler);
router.get('/schools/:schoolId/fees', authenticateToken, superAdminOnly, getSchoolFeesHandler);
router.get('/schools/:schoolId/homework', authenticateToken, superAdminOnly, getSchoolHomeworkHandler);
router.get('/schools/:schoolId/notices', authenticateToken, superAdminOnly, getSchoolNoticesHandler);
router.get('/schools/:schoolId/timetables', authenticateToken, superAdminOnly, getSchoolTimetablesHandler);
router.get('/schools/:schoolId/medical-records', authenticateToken, superAdminOnly, getSchoolMedicalRecordsHandler);

export default router;
