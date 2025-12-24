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
exports.createResultHandler = createResultHandler;
exports.listResultsHandler = listResultsHandler;
exports.getResultByIdHandler = getResultByIdHandler;
exports.updateResultHandler = updateResultHandler;
exports.deleteResultHandler = deleteResultHandler;
exports.getStudentResultsHandler = getStudentResultsHandler;
const resultService = __importStar(require("../services/examResult.service"));
async function createResultHandler(req, res) {
    try {
        if (!['teacher', 'admin', 'institute', 'super_admin'].includes(req.user?.role || '')) {
            res.status(403).json({ success: false, message: 'Only teachers and admins can create results' });
            return;
        }
        const result = await resultService.createResult(req.body);
        res.status(201).json({ success: true, data: result });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
async function listResultsHandler(req, res) {
    try {
        const filter = {};
        if (req.query.examId)
            filter.examId = req.query.examId;
        if (req.query.studentId)
            filter.studentId = req.query.studentId;
        // Students can only see their own results
        if (req.user?.role === 'student') {
            filter.studentId = req.user.id;
        }
        const results = await resultService.listResults(filter);
        res.json({ success: true, data: results });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
async function getResultByIdHandler(req, res) {
    try {
        const result = await resultService.getResultById(req.params.id);
        if (!result) {
            res.status(404).json({ success: false, message: 'Result not found' });
            return;
        }
        // Students can only view their own results
        if (req.user?.role === 'student' && result.studentId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }
        res.json({ success: true, data: result });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
async function updateResultHandler(req, res) {
    try {
        if (!['teacher', 'admin', 'institute', 'super_admin'].includes(req.user?.role || '')) {
            res.status(403).json({ success: false, message: 'Only teachers and admins can update results' });
            return;
        }
        const updated = await resultService.updateResult(req.params.id, req.body);
        if (!updated) {
            res.status(404).json({ success: false, message: 'Result not found' });
            return;
        }
        res.json({ success: true, data: updated });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
async function deleteResultHandler(req, res) {
    try {
        if (!['admin', 'institute', 'super_admin'].includes(req.user?.role || '')) {
            res.status(403).json({ success: false, message: 'Only admins can delete results' });
            return;
        }
        const deleted = await resultService.deleteResult(req.params.id);
        if (!deleted) {
            res.status(404).json({ success: false, message: 'Result not found' });
            return;
        }
        res.json({ success: true, message: 'Result deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
async function getStudentResultsHandler(req, res) {
    try {
        const studentId = req.params.studentId;
        // Students can only view their own results
        if (req.user?.role === 'student' && studentId !== req.user.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }
        const results = await resultService.getStudentResults(studentId);
        res.json({ success: true, data: results });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
//# sourceMappingURL=examResult.controller.js.map