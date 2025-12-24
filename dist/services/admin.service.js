"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAdmin = createAdmin;
exports.listAdmins = listAdmins;
exports.getAdminById = getAdminById;
exports.updateAdmin = updateAdmin;
exports.deleteAdmin = deleteAdmin;
exports.getAllTeachersForAdmin = getAllTeachersForAdmin;
exports.getAllStudentsForAdmin = getAllStudentsForAdmin;
const Admin_model_1 = require("../models/Admin.model");
const Teacher_model_1 = require("../models/Teacher.model");
const Student_model_1 = require("../models/Student.model");
async function createAdmin(data) {
    const created = await Admin_model_1.AdminModel.create(data);
    return created;
}
async function listAdmins(filter = {}) {
    return Admin_model_1.AdminModel.find({ ...filter, isActive: true })
        .select('-password')
        .lean();
}
async function getAdminById(id) {
    return Admin_model_1.AdminModel.findById(id).select('-password').lean();
}
async function updateAdmin(id, updates) {
    return Admin_model_1.AdminModel.findByIdAndUpdate(id, updates, { new: true })
        .select('-password')
        .lean();
}
async function deleteAdmin(id) {
    // Soft delete - set isActive to false
    return Admin_model_1.AdminModel.findByIdAndUpdate(id, { isActive: false, updatedAt: new Date() }, { new: true })
        .select('-password')
        .lean();
}
// Admin can view all teachers and students
async function getAllTeachersForAdmin() {
    return await Teacher_model_1.TeacherModel.find().select('-password');
}
async function getAllStudentsForAdmin() {
    return await Student_model_1.StudentModel.find().select('-password').populate('teacher', 'firstName lastName email');
}
//# sourceMappingURL=admin.service.js.map