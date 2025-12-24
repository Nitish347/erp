"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRecord = createRecord;
exports.listRecords = listRecords;
exports.getRecordById = getRecordById;
exports.updateRecord = updateRecord;
exports.deleteRecord = deleteRecord;
exports.getRecordsByStudent = getRecordsByStudent;
exports.getRecordsByDateRange = getRecordsByDateRange;
const MedicalRecord_model_1 = require("../models/MedicalRecord.model");
async function createRecord(data) {
    const record = new MedicalRecord_model_1.MedicalRecordModel(data);
    return await record.save();
}
async function listRecords(filter = {}) {
    return await MedicalRecord_model_1.MedicalRecordModel.find(filter)
        .populate('userId', 'firstName lastName email enrollmentNumber')
        .sort({ checkupDate: -1 })
        .exec();
}
async function getRecordById(id) {
    return await MedicalRecord_model_1.MedicalRecordModel.findById(id)
        .populate('userId', 'firstName lastName email enrollmentNumber')
        .exec();
}
async function updateRecord(id, data) {
    return await MedicalRecord_model_1.MedicalRecordModel.findByIdAndUpdate(id, data, { new: true })
        .populate('userId', 'firstName lastName email enrollmentNumber')
        .exec();
}
async function deleteRecord(id) {
    return await MedicalRecord_model_1.MedicalRecordModel.findByIdAndDelete(id).exec();
}
async function getRecordsByStudent(userId) {
    return await MedicalRecord_model_1.MedicalRecordModel.find({ userId })
        .sort({ checkupDate: -1 })
        .exec();
}
async function getRecordsByDateRange(userId, startDate, endDate) {
    return await MedicalRecord_model_1.MedicalRecordModel.find({
        userId,
        checkupDate: { $gte: startDate, $lte: endDate },
    })
        .sort({ checkupDate: -1 })
        .exec();
}
//# sourceMappingURL=medicalRecord.service.js.map