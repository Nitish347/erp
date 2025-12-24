"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAdminHandler = createAdminHandler;
exports.listAdminsHandler = listAdminsHandler;
exports.getAdminByIdHandler = getAdminByIdHandler;
exports.updateAdminHandler = updateAdminHandler;
exports.deleteAdminHandler = deleteAdminHandler;
exports.getAllTeachersHandler = getAllTeachersHandler;
exports.getAllStudentsHandler = getAllStudentsHandler;
const admin_service_1 = require("../services/admin.service");
async function createAdminHandler(req, res) {
    try {
        const admin = await (0, admin_service_1.createAdmin)(req.body);
        const adminData = admin.toObject();
        delete adminData.password;
        res.status(201).json({ success: true, data: adminData });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
async function listAdminsHandler(_req, res) {
    try {
        const admins = await (0, admin_service_1.listAdmins)();
        res.json({ success: true, data: admins });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
async function getAdminByIdHandler(req, res) {
    try {
        const admin = await (0, admin_service_1.getAdminById)(req.params.id);
        if (!admin) {
            res.status(404).json({ success: false, message: 'Admin not found' });
            return;
        }
        res.json({ success: true, data: admin });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
async function updateAdminHandler(req, res) {
    try {
        const updated = await (0, admin_service_1.updateAdmin)(req.params.id, req.body);
        if (!updated) {
            res.status(404).json({ success: false, message: 'Admin not found' });
            return;
        }
        res.json({ success: true, data: updated });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
async function deleteAdminHandler(req, res) {
    try {
        const deleted = await (0, admin_service_1.deleteAdmin)(req.params.id);
        if (!deleted) {
            res.status(404).json({ success: false, message: 'Admin not found' });
            return;
        }
        res.json({ success: true, message: 'Admin deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
// View all teachers and students
async function getAllTeachersHandler(req, res) {
    try {
        if (!req.user || req.user.role !== 'admin') {
            res.status(403).json({ success: false, message: 'Only admins can view all teachers' });
            return;
        }
        const teachers = await (0, admin_service_1.getAllTeachersForAdmin)();
        res.json({ success: true, data: teachers });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
async function getAllStudentsHandler(req, res) {
    try {
        if (!req.user || req.user.role !== 'admin') {
            res.status(403).json({ success: false, message: 'Only admins can view all students' });
            return;
        }
        const students = await (0, admin_service_1.getAllStudentsForAdmin)();
        res.json({ success: true, data: students });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
//# sourceMappingURL=admin.controller.js.map