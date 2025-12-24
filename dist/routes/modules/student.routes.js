"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const student_controller_1 = require("../../controllers/student.controller");
const auth_1 = require("../../middlewares/auth");
const router = (0, express_1.Router)();
// Protected routes - require authentication
// Admins can manage students, teachers can update/delete their own students
router.post('/', auth_1.authenticateToken, (0, auth_1.requireRole)(['admin']), student_controller_1.createStudentHandler);
router.get('/', auth_1.authenticateToken, student_controller_1.listStudentsHandler);
router.get('/:id', auth_1.authenticateToken, student_controller_1.getStudentByIdHandler);
router.patch('/:id', auth_1.authenticateToken, (0, auth_1.requireRole)(['admin']), student_controller_1.updateStudentHandler);
router.delete('/:id', auth_1.authenticateToken, (0, auth_1.requireRole)(['admin']), student_controller_1.deleteStudentHandler);
exports.default = router;
//# sourceMappingURL=student.routes.js.map