"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStudent = createStudent;
exports.listStudents = listStudents;
exports.getStudentById = getStudentById;
exports.updateStudent = updateStudent;
exports.deleteStudent = deleteStudent;
const Student_model_1 = require("../models/Student.model");
async function createStudent(data) {
    const created = await Student_model_1.StudentModel.create(data);
    return created;
}
async function listStudents(filter = {}) {
    return Student_model_1.StudentModel.find(filter).lean();
}
async function getStudentById(id) {
    return Student_model_1.StudentModel.findById(id).lean();
}
async function updateStudent(id, updates) {
    return Student_model_1.StudentModel.findByIdAndUpdate(id, updates, { new: true }).lean();
}
async function deleteStudent(id) {
    return Student_model_1.StudentModel.findByIdAndDelete(id).lean();
}
//# sourceMappingURL=student.service.js.map