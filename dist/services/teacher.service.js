"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTeacher = createTeacher;
exports.listTeachers = listTeachers;
exports.getTeacherById = getTeacherById;
exports.updateTeacher = updateTeacher;
exports.deleteTeacher = deleteTeacher;
exports.createStudentByTeacher = createStudentByTeacher;
exports.listStudentsByTeacher = listStudentsByTeacher;
exports.getStudentByTeacher = getStudentByTeacher;
exports.updateStudentByTeacher = updateStudentByTeacher;
exports.deleteStudentByTeacher = deleteStudentByTeacher;
const Teacher_model_1 = require("../models/Teacher.model");
const Student_model_1 = require("../models/Student.model");
async function createTeacher(data) {
    const created = await Teacher_model_1.TeacherModel.create(data);
    return created;
}
async function listTeachers(filter = {}) {
    return Teacher_model_1.TeacherModel.find(filter).lean();
}
async function getTeacherById(id) {
    return Teacher_model_1.TeacherModel.findById(id).lean();
}
async function updateTeacher(id, updates) {
    return Teacher_model_1.TeacherModel.findByIdAndUpdate(id, updates, { new: true }).lean();
}
async function deleteTeacher(id) {
    return Teacher_model_1.TeacherModel.findByIdAndDelete(id).lean();
}
// Teacher-specific operations - can only manage students assigned to them
async function createStudentByTeacher(teacherId, data) {
    const teacher = await Teacher_model_1.TeacherModel.findById(teacherId);
    if (!teacher) {
        throw new Error('Teacher not found');
    }
    const student = new Student_model_1.StudentModel({ ...data, teacher: teacherId });
    return await student.save();
}
async function listStudentsByTeacher(teacherId) {
    return await Student_model_1.StudentModel.find({ teacher: teacherId }).select('-password');
}
async function getStudentByTeacher(teacherId, studentId) {
    return await Student_model_1.StudentModel.findOne({ _id: studentId, teacher: teacherId }).select('-password');
}
async function updateStudentByTeacher(teacherId, studentId, data) {
    return await Student_model_1.StudentModel.findOneAndUpdate({ _id: studentId, teacher: teacherId }, { ...data, updatedAt: new Date() }, { new: true }).select('-password');
}
async function deleteStudentByTeacher(teacherId, studentId) {
    return await Student_model_1.StudentModel.findOneAndDelete({ _id: studentId, teacher: teacherId });
}
//# sourceMappingURL=teacher.service.js.map