"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const teacher_controller_1 = require("../../controllers/teacher.controller");
const auth_1 = require("../../middlewares/auth");
const router = (0, express_1.Router)();
// Protected routes - require authentication
// Admins can manage teachers
router.post('/', auth_1.authenticateToken, (0, auth_1.requireRole)(['admin']), teacher_controller_1.createTeacherHandler);
router.get('/', auth_1.authenticateToken, teacher_controller_1.listTeachersHandler);
// Teacher managing students (uses authenticated teacher's ID from context)
// These routes must come before /:id to avoid route conflicts
router.get('/students', auth_1.authenticateToken, (0, auth_1.requireRole)(['teacher']), teacher_controller_1.listStudentsByTeacherHandler);
router.get('/students/:studentId', auth_1.authenticateToken, (0, auth_1.requireRole)(['teacher']), teacher_controller_1.getStudentByTeacherHandler);
// Teacher CRUD operations (must come after specific routes)
router.get('/:id', auth_1.authenticateToken, teacher_controller_1.getTeacherByIdHandler);
router.patch('/:id', auth_1.authenticateToken, (0, auth_1.requireRole)(['admin']), teacher_controller_1.updateTeacherHandler);
router.delete('/:id', auth_1.authenticateToken, (0, auth_1.requireRole)(['admin']), teacher_controller_1.deleteTeacherHandler);
exports.default = router;
//# sourceMappingURL=teacher.routes.js.map