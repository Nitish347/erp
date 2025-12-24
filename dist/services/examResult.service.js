"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResult = createResult;
exports.listResults = listResults;
exports.getResultById = getResultById;
exports.updateResult = updateResult;
exports.deleteResult = deleteResult;
exports.getStudentResults = getStudentResults;
exports.getResultsByExam = getResultsByExam;
exports.getResultByExamAndStudent = getResultByExamAndStudent;
const ExamResult_model_1 = require("../models/ExamResult.model");
async function createResult(data) {
    const result = new ExamResult_model_1.ExamResultModel(data);
    return await result.save();
}
async function listResults(filter = {}) {
    return await ExamResult_model_1.ExamResultModel.find(filter)
        .populate('examId', 'name type subject examDate totalMarks')
        .populate('studentId', 'firstName lastName email enrollmentNumber')
        .sort({ createdAt: -1 })
        .exec();
}
async function getResultById(id) {
    return await ExamResult_model_1.ExamResultModel.findById(id)
        .populate('examId', 'name type subject examDate totalMarks')
        .populate('studentId', 'firstName lastName email enrollmentNumber')
        .exec();
}
async function updateResult(id, data) {
    return await ExamResult_model_1.ExamResultModel.findByIdAndUpdate(id, data, { new: true })
        .populate('examId', 'name type subject examDate totalMarks')
        .populate('studentId', 'firstName lastName email enrollmentNumber')
        .exec();
}
async function deleteResult(id) {
    return await ExamResult_model_1.ExamResultModel.findByIdAndDelete(id).exec();
}
async function getStudentResults(studentId) {
    return await ExamResult_model_1.ExamResultModel.find({ studentId })
        .populate('examId', 'name type subject examDate totalMarks')
        .sort({ createdAt: -1 })
        .exec();
}
async function getResultsByExam(examId) {
    return await ExamResult_model_1.ExamResultModel.find({ examId })
        .populate('studentId', 'firstName lastName email enrollmentNumber')
        .sort({ marks: -1 })
        .exec();
}
async function getResultByExamAndStudent(examId, studentId) {
    return await ExamResult_model_1.ExamResultModel.findOne({ examId, studentId })
        .populate('examId', 'name type subject examDate totalMarks')
        .exec();
}
//# sourceMappingURL=examResult.service.js.map