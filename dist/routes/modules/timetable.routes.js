"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const timetable_controller_1 = require("../../controllers/timetable.controller");
const auth_1 = require("../../middlewares/auth");
const router = (0, express_1.Router)();
// Public routes (require authentication)
router.get('/', auth_1.authenticateToken, timetable_controller_1.getAllTimetablesHandler);
router.get('/conflicts', auth_1.authenticateToken, timetable_controller_1.getTimetableConflictsHandler);
router.get('/teacher/:teacherId', auth_1.authenticateToken, timetable_controller_1.getTimetableByTeacherHandler);
router.get('/student/:studentId', auth_1.authenticateToken, timetable_controller_1.getTimetableByStudentHandler);
router.get('/:id', auth_1.authenticateToken, timetable_controller_1.getTimetableByIdHandler);
// Protected routes - Teacher timetables can only be updated by admins
router.post('/teacher', auth_1.authenticateToken, (0, auth_1.requireRole)(['admin']), timetable_controller_1.createTimetableHandler);
router.patch('/teacher/:id', auth_1.authenticateToken, (0, auth_1.requireRole)(['admin']), timetable_controller_1.updateTimetableHandler);
router.delete('/teacher/:id', auth_1.authenticateToken, (0, auth_1.requireRole)(['admin']), timetable_controller_1.deleteTimetableHandler);
// Protected routes - Student timetables can be managed by both teachers and admins
router.post('/student', auth_1.authenticateToken, (0, auth_1.requireRole)(['teacher', 'admin']), timetable_controller_1.createTimetableHandler);
router.patch('/student/:id', auth_1.authenticateToken, (0, auth_1.requireRole)(['teacher', 'admin']), timetable_controller_1.updateTimetableHandler);
router.delete('/student/:id', auth_1.authenticateToken, (0, auth_1.requireRole)(['teacher', 'admin']), timetable_controller_1.deleteTimetableHandler);
exports.default = router;
//# sourceMappingURL=timetable.routes.js.map