"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFee = createFee;
exports.listFees = listFees;
exports.getFeeById = getFeeById;
exports.updateFee = updateFee;
exports.deleteFee = deleteFee;
exports.recordPayment = recordPayment;
exports.getFeesByStudent = getFeesByStudent;
exports.getPendingFees = getPendingFees;
exports.updateOverdueFees = updateOverdueFees;
const Fee_model_1 = require("../models/Fee.model");
async function createFee(data) {
    const fee = new Fee_model_1.FeeModel(data);
    return await fee.save();
}
async function listFees(filter = {}) {
    return await Fee_model_1.FeeModel.find(filter)
        .populate('studentId', 'firstName lastName email enrollmentNumber')
        .sort({ dueDate: -1 })
        .exec();
}
async function getFeeById(id) {
    return await Fee_model_1.FeeModel.findById(id)
        .populate('studentId', 'firstName lastName email enrollmentNumber')
        .exec();
}
async function updateFee(id, data) {
    return await Fee_model_1.FeeModel.findByIdAndUpdate(id, data, { new: true })
        .populate('studentId', 'firstName lastName email enrollmentNumber')
        .exec();
}
async function deleteFee(id) {
    return await Fee_model_1.FeeModel.findByIdAndDelete(id).exec();
}
async function recordPayment(id, paymentData) {
    const fee = await Fee_model_1.FeeModel.findById(id);
    if (!fee)
        return null;
    const totalPaid = fee.paidAmount + paymentData.paidAmount;
    let status = 'pending';
    if (totalPaid >= fee.amount) {
        status = 'paid';
    }
    else if (totalPaid > 0) {
        status = 'partial';
    }
    return await Fee_model_1.FeeModel.findByIdAndUpdate(id, {
        paidAmount: totalPaid,
        paidDate: new Date(),
        status,
        paymentMethod: paymentData.paymentMethod,
        transactionId: paymentData.transactionId,
    }, { new: true })
        .populate('studentId', 'firstName lastName email enrollmentNumber')
        .exec();
}
async function getFeesByStudent(studentId) {
    return await Fee_model_1.FeeModel.find({ studentId })
        .sort({ dueDate: -1 })
        .exec();
}
async function getPendingFees(studentId) {
    return await Fee_model_1.FeeModel.find({
        studentId,
        status: { $in: ['pending', 'partial', 'overdue'] },
    })
        .sort({ dueDate: 1 })
        .exec();
}
async function updateOverdueFees() {
    const now = new Date();
    await Fee_model_1.FeeModel.updateMany({
        dueDate: { $lt: now },
        status: { $in: ['pending', 'partial'] },
    }, { status: 'overdue' });
}
//# sourceMappingURL=fee.service.js.map