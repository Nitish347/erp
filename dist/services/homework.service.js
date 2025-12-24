"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHomework = createHomework;
exports.listHomework = listHomework;
exports.getHomeworkById = getHomeworkById;
exports.updateHomework = updateHomework;
exports.deleteHomework = deleteHomework;
exports.getHomeworkByClass = getHomeworkByClass;
exports.getHomeworkByTeacher = getHomeworkByTeacher;
const Homework_model_1 = require("../models/Homework.model");
async function createHomework(data) {
    const homework = new Homework_model_1.HomeworkModel(data);
    return await homework.save();
}
async function listHomework(filter = {}) {
    return await Homework_model_1.HomeworkModel.find(filter)
        .populate('teacherId', 'firstName lastName email')
        .sort({ dueDate: -1 })
        .exec();
}
async function getHomeworkById(id) {
    return await Homework_model_1.HomeworkModel.findById(id)
        .populate('teacherId', 'firstName lastName email')
        .exec();
}
async function updateHomework(id, data) {
    return await Homework_model_1.HomeworkModel.findByIdAndUpdate(id, data, { new: true })
        .populate('teacherId', 'firstName lastName email')
        .exec();
}
async function deleteHomework(id) {
    return await Homework_model_1.HomeworkModel.findByIdAndDelete(id).exec();
}
async function getHomeworkByClass(classId, section) {
    return await Homework_model_1.HomeworkModel.find({ classId, section })
        .populate('teacherId', 'firstName lastName email')
        .sort({ dueDate: -1 })
        .exec();
}
async function getHomeworkByTeacher(teacherId) {
    return await Homework_model_1.HomeworkModel.find({ teacherId })
        .sort({ dueDate: -1 })
        .exec();
}
//# sourceMappingURL=homework.service.js.map