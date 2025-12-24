"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const attendance_controller_1 = require("../../controllers/attendance.controller");
const auth_1 = require("../../middlewares/auth");
const router = (0, express_1.Router)();
// Public routes (require authentication)
router.get('/', auth_1.authenticateToken, attendance_controller_1.getAllAttendanceHandler);
router.get('/stats', auth_1.authenticateToken, attendance_controller_1.getAttendanceStatsHandler);
router.get('/daily/:date', auth_1.authenticateToken, attendance_controller_1.getDailyAttendanceHandler);
router.get('/teacher/:teacherId', auth_1.authenticateToken, attendance_controller_1.getAttendanceByTeacherHandler);
router.get('/student/:studentId', auth_1.authenticateToken, attendance_controller_1.getAttendanceByStudentHandler);
router.get('/:id', auth_1.authenticateToken, attendance_controller_1.getAttendanceByIdHandler);
// Protected routes - Attendance can be managed by teachers and admins
router.post('/', auth_1.authenticateToken, (0, auth_1.requireRole)(['teacher', 'admin']), attendance_controller_1.markAttendanceHandler);
router.post('/bulk', auth_1.authenticateToken, (0, auth_1.requireRole)(['teacher', 'admin']), attendance_controller_1.bulkMarkAttendanceHandler);
router.patch('/:id', auth_1.authenticateToken, (0, auth_1.requireRole)(['teacher', 'admin']), attendance_controller_1.updateAttendanceHandler);
router.delete('/:id', auth_1.authenticateToken, (0, auth_1.requireRole)(['teacher', 'admin']), attendance_controller_1.deleteAttendanceHandler);
exports.default = router;
//# sourceMappingURL=attendance.routes.js.map