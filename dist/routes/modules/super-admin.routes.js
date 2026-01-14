"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const super_admin_controller_1 = require("../../controllers/super-admin.controller");
const auth_1 = require("../../middlewares/auth");
const router = (0, express_1.Router)();
// All routes require super_admin role
const superAdminOnly = (0, auth_1.requireRole)(['super_admin']);
// Dashboard
router.get('/dashboard/stats', auth_1.authenticateToken, superAdminOnly, super_admin_controller_1.getDashboardStatsHandler);
// School Management
router.get('/schools', auth_1.authenticateToken, superAdminOnly, super_admin_controller_1.listAllSchoolsHandler);
router.get('/schools/:id', auth_1.authenticateToken, superAdminOnly, super_admin_controller_1.getSchoolDetailsHandler);
router.patch('/schools/:id', auth_1.authenticateToken, superAdminOnly, super_admin_controller_1.updateSchoolHandler);
router.delete('/schools/:id', auth_1.authenticateToken, superAdminOnly, super_admin_controller_1.deleteSchoolHandler);
// Student Management - All Students
router.get('/students', auth_1.authenticateToken, superAdminOnly, super_admin_controller_1.getAllStudentsHandler);
router.patch('/students/:id', auth_1.authenticateToken, superAdminOnly, super_admin_controller_1.updateStudentHandler);
router.delete('/students/:id', auth_1.authenticateToken, superAdminOnly, super_admin_controller_1.deleteStudentHandler);
// Student Management - By School
router.get('/schools/:schoolId/students', auth_1.authenticateToken, superAdminOnly, super_admin_controller_1.getSchoolStudentsHandler);
router.post('/schools/:schoolId/students', auth_1.authenticateToken, superAdminOnly, super_admin_controller_1.createSchoolStudentHandler);
// Teacher Management - All Teachers
router.get('/teachers', auth_1.authenticateToken, superAdminOnly, super_admin_controller_1.getAllTeachersHandler);
router.patch('/teachers/:id', auth_1.authenticateToken, superAdminOnly, super_admin_controller_1.updateTeacherHandler);
router.delete('/teachers/:id', auth_1.authenticateToken, superAdminOnly, super_admin_controller_1.deleteTeacherHandler);
// Teacher Management - By School
router.get('/schools/:schoolId/teachers', auth_1.authenticateToken, superAdminOnly, super_admin_controller_1.getSchoolTeachersHandler);
router.post('/schools/:schoolId/teachers', auth_1.authenticateToken, superAdminOnly, super_admin_controller_1.createSchoolTeacherHandler);
// Resource Management - By School
router.get('/schools/:schoolId/classes', auth_1.authenticateToken, superAdminOnly, super_admin_controller_1.getSchoolClassesHandler);
router.get('/schools/:schoolId/attendance', auth_1.authenticateToken, superAdminOnly, super_admin_controller_1.getSchoolAttendanceHandler);
router.get('/schools/:schoolId/exams', auth_1.authenticateToken, superAdminOnly, super_admin_controller_1.getSchoolExamsHandler);
router.get('/schools/:schoolId/fees', auth_1.authenticateToken, superAdminOnly, super_admin_controller_1.getSchoolFeesHandler);
router.get('/schools/:schoolId/homework', auth_1.authenticateToken, superAdminOnly, super_admin_controller_1.getSchoolHomeworkHandler);
router.get('/schools/:schoolId/notices', auth_1.authenticateToken, superAdminOnly, super_admin_controller_1.getSchoolNoticesHandler);
router.get('/schools/:schoolId/timetables', auth_1.authenticateToken, superAdminOnly, super_admin_controller_1.getSchoolTimetablesHandler);
router.get('/schools/:schoolId/medical-records', auth_1.authenticateToken, superAdminOnly, super_admin_controller_1.getSchoolMedicalRecordsHandler);
exports.default = router;
//# sourceMappingURL=super-admin.routes.js.map