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
exports.createSubjectHandler = createSubjectHandler;
exports.listSubjectsHandler = listSubjectsHandler;
exports.getSubjectByIdHandler = getSubjectByIdHandler;
exports.updateSubjectHandler = updateSubjectHandler;
exports.deleteSubjectHandler = deleteSubjectHandler;
const subjectService = __importStar(require("../services/subject.service"));
async function createSubjectHandler(req, res) {
    try {
        if (!['admin', 'super_admin'].includes(req.user?.role || '')) {
            res.status(403).json({ success: false, message: 'Only admins can create subjects' });
            return;
        }
        const subject = await subjectService.createSubject(req.body);
        res.status(201).json({ success: true, data: subject });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
async function listSubjectsHandler(req, res) {
    try {
        const filter = {};
        if (req.user?.role === 'admin') {
            filter.instituteId = req.user.id;
        }
        if (req.query.classId)
            filter.classId = req.query.classId;
        if (req.query.teacherId)
            filter.teacherId = req.query.teacherId;
        const subjects = await subjectService.listSubjects(filter);
        res.json({ success: true, data: subjects });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
async function getSubjectByIdHandler(req, res) {
    try {
        const subject = await subjectService.getSubjectById(req.params.id);
        if (!subject) {
            res.status(404).json({ success: false, message: 'Subject not found' });
            return;
        }
        if (req.user?.role === 'admin' && subject.instituteId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }
        res.json({ success: true, data: subject });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
async function updateSubjectHandler(req, res) {
    try {
        const subject = await subjectService.getSubjectById(req.params.id);
        if (!subject) {
            res.status(404).json({ success: false, message: 'Subject not found' });
            return;
        }
        // Teachers can update their assigned subjects
        if (req.user?.role === 'teacher' && subject.teacherId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'You can only update your assigned subjects' });
            return;
        }
        if (req.user?.role === 'admin' && subject.instituteId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }
        const updated = await subjectService.updateSubject(req.params.id, req.body);
        res.json({ success: true, data: updated });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
async function deleteSubjectHandler(req, res) {
    try {
        if (!['admin', 'super_admin'].includes(req.user?.role || '')) {
            res.status(403).json({ success: false, message: 'Only admins can delete subjects' });
            return;
        }
        const subject = await subjectService.getSubjectById(req.params.id);
        if (!subject) {
            res.status(404).json({ success: false, message: 'Subject not found' });
            return;
        }
        if (req.user?.role === 'admin' && subject.instituteId?.toString() !== req.user?.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }
        await subjectService.deleteSubject(req.params.id);
        res.json({ success: true, message: 'Subject deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
//# sourceMappingURL=subject.controller.js.map