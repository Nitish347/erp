"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExam = createExam;
exports.listExams = listExams;
exports.getExamById = getExamById;
exports.updateExam = updateExam;
exports.deleteExam = deleteExam;
exports.getExamsByClass = getExamsByClass;
exports.getExamsByTeacher = getExamsByTeacher;
exports.getUpcomingExams = getUpcomingExams;
const Exam_model_1 = require("../models/Exam.model");
async function createExam(data) {
    const exam = new Exam_model_1.ExamModel(data);
    return await exam.save();
}
async function listExams(filter = {}) {
    return await Exam_model_1.ExamModel.find(filter)
        .populate('teacherId', 'firstName lastName email')
        .sort({ examDate: -1 })
        .exec();
}
async function getExamById(id) {
    return await Exam_model_1.ExamModel.findById(id)
        .populate('teacherId', 'firstName lastName email')
        .exec();
}
async function updateExam(id, data) {
    return await Exam_model_1.ExamModel.findByIdAndUpdate(id, data, { new: true })
        .populate('teacherId', 'firstName lastName email')
        .exec();
}
async function deleteExam(id) {
    return await Exam_model_1.ExamModel.findByIdAndDelete(id).exec();
}
async function getExamsByClass(classId, section) {
    return await Exam_model_1.ExamModel.find({ classId, section, isActive: true })
        .populate('teacherId', 'firstName lastName email')
        .sort({ examDate: -1 })
        .exec();
}
async function getExamsByTeacher(teacherId) {
    return await Exam_model_1.ExamModel.find({ teacherId })
        .sort({ examDate: -1 })
        .exec();
}
async function getUpcomingExams(classId, section) {
    const now = new Date();
    return await Exam_model_1.ExamModel.find({
        classId,
        section,
        examDate: { $gte: now },
        isActive: true,
    })
        .populate('teacherId', 'firstName lastName email')
        .sort({ examDate: 1 })
        .exec();
}
//# sourceMappingURL=exam.service.js.map