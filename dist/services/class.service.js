"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClass = createClass;
exports.listClasses = listClasses;
exports.getClassById = getClassById;
exports.updateClass = updateClass;
exports.deleteClass = deleteClass;
exports.getClassesByGrade = getClassesByGrade;
const Class_model_1 = require("../models/Class.model");
async function createClass(data) {
    const classData = new Class_model_1.ClassModel(data);
    return await classData.save();
}
async function listClasses(filter = {}) {
    return await Class_model_1.ClassModel.find(filter)
        .populate('teacherId', 'firstName lastName email')
        .sort({ grade: 1, name: 1 })
        .exec();
}
async function getClassById(id) {
    return await Class_model_1.ClassModel.findById(id)
        .populate('teacherId', 'firstName lastName email')
        .exec();
}
async function updateClass(id, data) {
    return await Class_model_1.ClassModel.findByIdAndUpdate(id, data, { new: true })
        .populate('teacherId', 'firstName lastName email')
        .exec();
}
async function deleteClass(id) {
    return await Class_model_1.ClassModel.findByIdAndDelete(id).exec();
}
async function getClassesByGrade(grade) {
    return await Class_model_1.ClassModel.find({ grade, isActive: true })
        .populate('teacherId', 'firstName lastName email')
        .sort({ name: 1 })
        .exec();
}
//# sourceMappingURL=class.service.js.map