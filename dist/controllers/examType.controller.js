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
exports.createExamTypeHandler = createExamTypeHandler;
exports.listExamTypesHandler = listExamTypesHandler;
exports.getExamTypeByIdHandler = getExamTypeByIdHandler;
exports.updateExamTypeHandler = updateExamTypeHandler;
exports.deleteExamTypeHandler = deleteExamTypeHandler;
const examTypeService = __importStar(require("../services/examType.service"));
async function createExamTypeHandler(req, res) {
    try {
        if (!['admin', 'super_admin'].includes(req.user?.role || '')) {
            res.status(403).json({ success: false, message: 'Only admins can create exam types' });
            return;
        }
        // Automatically set instituteId from authenticated user
        req.body.instituteId = req.user.id;
        const examType = await examTypeService.createExamType(req.body);
        res.status(201).json({ success: true, data: examType });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
async function listExamTypesHandler(req, res) {
    try {
        const filter = {};
        // Filter by institute for admins
        if (req.user?.role === 'admin' || req.user?.role === 'super_admin') {
            filter.instituteId = req.user.id;
        }
        // Optional filters
        if (req.query.isActive !== undefined) {
            filter.isActive = req.query.isActive === 'true';
        }
        const examTypes = await examTypeService.listExamTypes(filter);
        res.json({ success: true, data: examTypes });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
async function getExamTypeByIdHandler(req, res) {
    try {
        const examType = await examTypeService.getExamTypeById(req.params.id);
        if (!examType) {
            res.status(404).json({ success: false, message: 'Exam type not found' });
            return;
        }
        // Check access
        if (req.user?.role === 'admin' && examType.instituteId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }
        res.json({ success: true, data: examType });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
async function updateExamTypeHandler(req, res) {
    try {
        const examType = await examTypeService.getExamTypeById(req.params.id);
        if (!examType) {
            res.status(404).json({ success: false, message: 'Exam type not found' });
            return;
        }
        // Check access
        if (req.user?.role === 'admin' && examType.instituteId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }
        const updated = await examTypeService.updateExamType(req.params.id, req.body);
        res.json({ success: true, data: updated });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
async function deleteExamTypeHandler(req, res) {
    try {
        const examType = await examTypeService.getExamTypeById(req.params.id);
        if (!examType) {
            res.status(404).json({ success: false, message: 'Exam type not found' });
            return;
        }
        // Check access
        if (req.user?.role === 'admin' && examType.instituteId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }
        await examTypeService.deleteExamType(req.params.id);
        res.json({ success: true, message: 'Exam type deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
//# sourceMappingURL=examType.controller.js.map