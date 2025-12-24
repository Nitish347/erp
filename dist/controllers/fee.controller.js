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
exports.createFeeHandler = createFeeHandler;
exports.listFeesHandler = listFeesHandler;
exports.getFeeByIdHandler = getFeeByIdHandler;
exports.updateFeeHandler = updateFeeHandler;
exports.recordPaymentHandler = recordPaymentHandler;
const feeService = __importStar(require("../services/fee.service"));
async function createFeeHandler(req, res) {
    try {
        if (!['admin', 'super_admin'].includes(req.user?.role || '')) {
            res.status(403).json({ success: false, message: 'Only admins can create fees' });
            return;
        }
        const fee = await feeService.createFee(req.body);
        res.status(201).json({ success: true, data: fee });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
async function listFeesHandler(req, res) {
    try {
        const filter = {};
        if (req.user?.role === 'admin') {
            filter.instituteId = req.user.id;
        }
        if (req.user?.role === 'student') {
            filter.studentId = req.user.id;
        }
        if (req.query.studentId && req.user?.role !== 'student') {
            filter.studentId = req.query.studentId;
        }
        if (req.query.status)
            filter.status = req.query.status;
        const fees = await feeService.listFees(filter);
        res.json({ success: true, data: fees });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
async function getFeeByIdHandler(req, res) {
    try {
        const fee = await feeService.getFeeById(req.params.id);
        if (!fee) {
            res.status(404).json({ success: false, message: 'Fee not found' });
            return;
        }
        // Students can only view their own fees
        if (req.user?.role === 'student' && fee.studentId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }
        if (req.user?.role === 'admin' && fee.instituteId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }
        res.json({ success: true, data: fee });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
async function updateFeeHandler(req, res) {
    try {
        if (!['admin', 'super_admin'].includes(req.user?.role || '')) {
            res.status(403).json({ success: false, message: 'Only admins can update fees' });
            return;
        }
        const fee = await feeService.getFeeById(req.params.id);
        if (!fee) {
            res.status(404).json({ success: false, message: 'Fee not found' });
            return;
        }
        if (req.user.role === 'admin' && fee.instituteId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }
        const updated = await feeService.updateFee(req.params.id, req.body);
        res.json({ success: true, data: updated });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
async function recordPaymentHandler(req, res) {
    try {
        const fee = await feeService.getFeeById(req.params.id);
        if (!fee) {
            res.status(404).json({ success: false, message: 'Fee not found' });
            return;
        }
        // Students can pay their own fees
        if (req.user?.role === 'student' && fee.studentId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }
        if (req.user?.role === 'admin' && fee.instituteId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }
        const { paidAmount, paymentMethod, transactionId } = req.body;
        const updated = await feeService.recordPayment(req.params.id, {
            paidAmount,
            paymentMethod,
            transactionId,
        });
        if (!updated) {
            res.status(404).json({ success: false, message: 'Fee not found' });
            return;
        }
        res.json({ success: true, data: updated });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
//# sourceMappingURL=fee.controller.js.map