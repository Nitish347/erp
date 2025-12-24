"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSubject = createSubject;
exports.listSubjects = listSubjects;
exports.getSubjectById = getSubjectById;
exports.updateSubject = updateSubject;
exports.deleteSubject = deleteSubject;
exports.getSubjectsByClass = getSubjectsByClass;
exports.getSubjectsByTeacher = getSubjectsByTeacher;
const Subject_model_1 = require("../models/Subject.model");
async function createSubject(data) {
    const subject = new Subject_model_1.SubjectModel(data);
    return await subject.save();
}
async function listSubjects(filter = {}) {
    return await Subject_model_1.SubjectModel.find(filter)
        .populate('teacherId', 'firstName lastName email')
        .sort({ name: 1 })
        .exec();
}
async function getSubjectById(id) {
    return await Subject_model_1.SubjectModel.findById(id)
        .populate('teacherId', 'firstName lastName email')
        .exec();
}
async function updateSubject(id, data) {
    return await Subject_model_1.SubjectModel.findByIdAndUpdate(id, data, { new: true })
        .populate('teacherId', 'firstName lastName email')
        .exec();
}
async function deleteSubject(id) {
    return await Subject_model_1.SubjectModel.findByIdAndDelete(id).exec();
}
async function getSubjectsByClass(classId) {
    return await Subject_model_1.SubjectModel.find({ classId, isActive: true })
        .populate('teacherId', 'firstName lastName email')
        .sort({ name: 1 })
        .exec();
}
async function getSubjectsByTeacher(teacherId) {
    return await Subject_model_1.SubjectModel.find({ teacherId, isActive: true })
        .sort({ name: 1 })
        .exec();
}
//# sourceMappingURL=subject.service.js.map