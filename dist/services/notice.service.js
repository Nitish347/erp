"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNotice = createNotice;
exports.listNotices = listNotices;
exports.getNoticeById = getNoticeById;
exports.updateNotice = updateNotice;
exports.deleteNotice = deleteNotice;
exports.getActiveNotices = getActiveNotices;
exports.getNoticesByClass = getNoticesByClass;
const Notice_model_1 = require("../models/Notice.model");
async function createNotice(data) {
    const notice = new Notice_model_1.NoticeModel(data);
    return await notice.save();
}
async function listNotices(filter = {}) {
    return await Notice_model_1.NoticeModel.find(filter)
        .sort({ issuedDate: -1 })
        .exec();
}
async function getNoticeById(id) {
    return await Notice_model_1.NoticeModel.findById(id).exec();
}
async function updateNotice(id, data) {
    return await Notice_model_1.NoticeModel.findByIdAndUpdate(id, data, { new: true }).exec();
}
async function deleteNotice(id) {
    return await Notice_model_1.NoticeModel.findByIdAndDelete(id).exec();
}
async function getActiveNotices(instituteId) {
    const now = new Date();
    return await Notice_model_1.NoticeModel.find({
        instituteId,
        $or: [{ expiryDate: { $gte: now } }, { expiryDate: null }],
    })
        .sort({ priority: -1, issuedDate: -1 })
        .exec();
}
async function getNoticesByClass(instituteId, classId, section) {
    const filter = {
        instituteId,
        $or: [
            { targetedClassId: classId },
            { targetedClassId: { $exists: false } },
            { targetedClassId: [] },
        ],
    };
    if (section) {
        filter.$or.push({ targetSections: section });
    }
    return await Notice_model_1.NoticeModel.find(filter)
        .sort({ issuedDate: -1 })
        .exec();
}
//# sourceMappingURL=notice.service.js.map