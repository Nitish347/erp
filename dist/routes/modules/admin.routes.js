"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("../../controllers/admin.controller");
const auth_1 = require("../../middlewares/auth");
const router = (0, express_1.Router)();
// Admin CRUD operations - only admins can manage other admins
router.post('/', auth_1.authenticateToken, (0, auth_1.requireRole)(['admin']), admin_controller_1.createAdminHandler);
router.get('/', auth_1.authenticateToken, (0, auth_1.requireRole)(['admin']), admin_controller_1.listAdminsHandler);
router.get('/:id', auth_1.authenticateToken, (0, auth_1.requireRole)(['admin']), admin_controller_1.getAdminByIdHandler);
router.patch('/:id', auth_1.authenticateToken, (0, auth_1.requireRole)(['admin']), admin_controller_1.updateAdminHandler);
router.delete('/:id', auth_1.authenticateToken, (0, auth_1.requireRole)(['admin']), admin_controller_1.deleteAdminHandler);
// Admin viewing all teachers and students
router.get('/teachers/all', auth_1.authenticateToken, (0, auth_1.requireRole)(['admin']), admin_controller_1.getAllTeachersHandler);
router.get('/students/all', auth_1.authenticateToken, (0, auth_1.requireRole)(['admin']), admin_controller_1.getAllStudentsHandler);
exports.default = router;
//# sourceMappingURL=admin.routes.js.map