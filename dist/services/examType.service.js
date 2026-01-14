"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExamType = createExamType;
exports.listExamTypes = listExamTypes;
exports.getExamTypeById = getExamTypeById;
exports.updateExamType = updateExamType;
exports.deleteExamType = deleteExamType;
const ExamType_model_1 = require("../models/ExamType.model");
async function createExamType(data) {
    const examType = new ExamType_model_1.ExamTypeModel(data);
    return await examType.save();
}
async function listExamTypes(filter = {}) {
    return await ExamType_model_1.ExamTypeModel.find(filter).sort({ startDate: -1 });
}
async function getExamTypeById(id) {
    return await ExamType_model_1.ExamTypeModel.findById(id);
}
async function updateExamType(id, data) {
    return await ExamType_model_1.ExamTypeModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}
async function deleteExamType(id) {
    return await ExamType_model_1.ExamTypeModel.findByIdAndDelete(id);
}
//# sourceMappingURL=examType.service.js.map