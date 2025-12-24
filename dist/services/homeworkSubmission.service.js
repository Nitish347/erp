"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSubmission = createSubmission;
exports.listSubmissions = listSubmissions;
exports.getSubmissionById = getSubmissionById;
exports.updateSubmission = updateSubmission;
exports.gradeSubmission = gradeSubmission;
exports.getSubmissionByHomeworkAndStudent = getSubmissionByHomeworkAndStudent;
exports.getSubmissionsByHomework = getSubmissionsByHomework;
exports.getSubmissionsByStudent = getSubmissionsByStudent;
const HomeworkSubmission_model_1 = require("../models/HomeworkSubmission.model");
async function createSubmission(data) {
    const submission = new HomeworkSubmission_model_1.HomeworkSubmissionModel(data);
    return await submission.save();
}
async function listSubmissions(filter = {}) {
    return await HomeworkSubmission_model_1.HomeworkSubmissionModel.find(filter)
        .populate('homeworkId', 'title subject dueDate')
        .populate('studentId', 'firstName lastName email enrollmentNumber')
        .sort({ createdAt: -1 })
        .exec();
}
async function getSubmissionById(id) {
    return await HomeworkSubmission_model_1.HomeworkSubmissionModel.findById(id)
        .populate('homeworkId', 'title subject dueDate totalMarks')
        .populate('studentId', 'firstName lastName email enrollmentNumber')
        .exec();
}
async function updateSubmission(id, data) {
    return await HomeworkSubmission_model_1.HomeworkSubmissionModel.findByIdAndUpdate(id, data, { new: true })
        .populate('homeworkId', 'title subject dueDate')
        .populate('studentId', 'firstName lastName email enrollmentNumber')
        .exec();
}
async function gradeSubmission(id, marksObtained, feedback) {
    return await HomeworkSubmission_model_1.HomeworkSubmissionModel.findByIdAndUpdate(id, { marksObtained, feedback, status: 'graded' }, { new: true })
        .populate('homeworkId', 'title subject dueDate')
        .populate('studentId', 'firstName lastName email enrollmentNumber')
        .exec();
}
async function getSubmissionByHomeworkAndStudent(homeworkId, studentId) {
    return await HomeworkSubmission_model_1.HomeworkSubmissionModel.findOne({ homeworkId, studentId })
        .populate('homeworkId', 'title subject dueDate totalMarks')
        .exec();
}
async function getSubmissionsByHomework(homeworkId) {
    return await HomeworkSubmission_model_1.HomeworkSubmissionModel.find({ homeworkId })
        .populate('studentId', 'firstName lastName email enrollmentNumber')
        .sort({ submittedAt: -1 })
        .exec();
}
async function getSubmissionsByStudent(studentId) {
    return await HomeworkSubmission_model_1.HomeworkSubmissionModel.find({ studentId })
        .populate('homeworkId', 'title subject dueDate totalMarks')
        .sort({ createdAt: -1 })
        .exec();
}
//# sourceMappingURL=homeworkSubmission.service.js.map