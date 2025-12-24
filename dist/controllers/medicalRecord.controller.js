"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRecordHandler = createRecordHandler;
exports.listRecordsHandler = listRecordsHandler;
exports.getRecordByIdHandler = getRecordByIdHandler;
exports.updateRecordHandler = updateRecordHandler;
exports.deleteRecordHandler = deleteRecordHandler;
const medicalRecordService = __importStar(require("../services/medicalRecord.service"));
async function createRecordHandler(req, res) {
    try {
        if (!['admin', 'super_admin'].includes(req.user?.role || '')) {
            res.status(403).json({ success: false, message: 'Only admins can create medical records' });
            return;
        }
        const record = await medicalRecordService.createRecord(req.body);
        res.status(201).json({ success: true, data: record });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
async function listRecordsHandler(req, res) {
    try {
        const filter = {};
        if (req.query.userId)
            filter.userId = req.query.userId;
        if (req.user?.role === 'admin') {
            filter.instituteId = req.user.id;
        }
        // Students can only see their own records
        if (req.user?.role === 'student') {
            filter.userId = req.user.id;
        }
        const records = await medicalRecordService.listRecords(filter);
        res.json({ success: true, data: records });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
async function getRecordByIdHandler(req, res) {
    try {
        const record = await medicalRecordService.getRecordById(req.params.id);
        if (!record) {
            res.status(404).json({ success: false, message: 'Medical record not found' });
            return;
        }
        // Students can only view their own records
        if (req.user?.role === 'student' && record.userId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }
        if (req.user?.role === 'admin' && record.instituteId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }
        res.json({ success: true, data: record });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
async function updateRecordHandler(req, res) {
    try {
        if (!['admin', 'super_admin'].includes(req.user?.role || '')) {
            res.status(403).json({ success: false, message: 'Only admins can update medical records' });
            return;
        }
        const record = await medicalRecordService.getRecordById(req.params.id);
        if (!record) {
            res.status(404).json({ success: false, message: 'Medical record not found' });
            return;
        }
        if (req.user.role === 'admin' && record.instituteId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }
        const updated = await medicalRecordService.updateRecord(req.params.id, req.body);
        res.json({ success: true, data: updated });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
async function deleteRecordHandler(req, res) {
    try {
        if (!['admin', 'super_admin'].includes(req.user?.role || '')) {
            res.status(403).json({ success: false, message: 'Only admins can delete medical records' });
            return;
        }
        const record = await medicalRecordService.getRecordById(req.params.id);
        if (!record) {
            res.status(404).json({ success: false, message: 'Medical record not found' });
            return;
        }
        if (req.user.role === 'admin' && record.instituteId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }
        await medicalRecordService.deleteRecord(req.params.id);
        res.json({ success: true, message: 'Medical record deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
//# sourceMappingURL=medicalRecord.controller.js.map