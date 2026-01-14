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
exports.createExamHandler = createExamHandler;
exports.listExamsHandler = listExamsHandler;
exports.getExamByIdHandler = getExamByIdHandler;
exports.updateExamHandler = updateExamHandler;
exports.deleteExamHandler = deleteExamHandler;
const examService = __importStar(require("../services/exam.service"));
async function createExamHandler(req, res) {
    try {
        if (!['teacher', 'admin', 'super_admin'].includes(req.user?.role || '')) {
            res.status(403).json({ success: false, message: 'Only teachers and admins can create exams' });
            return;
        }
        // Automatically set teacherId and instituteId based on user role
        if (req.user.role === 'teacher') {
            req.body.teacherId = req.user.id;
            // For teachers, fetch their institute from the teacher model
            const { TeacherModel } = await Promise.resolve().then(() => __importStar(require('../models/Teacher.model')));
            const teacher = await TeacherModel.findById(req.user.id);
            if (!teacher) {
                res.status(404).json({ success: false, message: 'Teacher not found' });
                return;
            }
            req.body.instituteId = teacher.institute;
        }
        else if (req.user.role === 'admin' || req.user.role === 'super_admin') {
            // For admins, their ID IS the instituteId (merged model)
            req.body.instituteId = req.user.id;
            // Also set teacherId to admin's ID for admin-created exams
            req.body.teacherId = req.user.id;
        }
        const exam = await examService.createExam(req.body);
        res.status(201).json({ success: true, data: exam });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
async function listExamsHandler(req, res) {
    try {
        const filter = {};
        if (req.user?.role === 'admin') {
            filter.instituteId = req.user.id;
        }
        else if (req.user?.role === 'teacher') {
            filter.teacherId = req.user.id;
        }
        if (req.query.classId)
            filter.classId = req.query.classId;
        if (req.query.section)
            filter.section = req.query.section;
        if (req.query.subject)
            filter.subject = req.query.subject;
        const exams = await examService.listExams(filter);
        res.json({ success: true, data: exams });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
async function getExamByIdHandler(req, res) {
    try {
        const exam = await examService.getExamById(req.params.id);
        if (!exam) {
            res.status(404).json({ success: false, message: 'Exam not found' });
            return;
        }
        if (req.user?.role === 'admin' && exam.instituteId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }
        if (req.user?.role === 'teacher' && exam.teacherId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }
        res.json({ success: true, data: exam });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
async function updateExamHandler(req, res) {
    try {
        const exam = await examService.getExamById(req.params.id);
        if (!exam) {
            res.status(404).json({ success: false, message: 'Exam not found' });
            return;
        }
        if (req.user?.role === 'teacher' && exam.teacherId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'You can only update your own exams' });
            return;
        }
        if (req.user?.role === 'admin' && exam.instituteId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }
        const updated = await examService.updateExam(req.params.id, req.body);
        res.json({ success: true, data: updated });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
async function deleteExamHandler(req, res) {
    try {
        const exam = await examService.getExamById(req.params.id);
        if (!exam) {
            res.status(404).json({ success: false, message: 'Exam not found' });
            return;
        }
        if (req.user?.role === 'teacher' && exam.teacherId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'You can only delete your own exams' });
            return;
        }
        if (req.user?.role === 'admin' && exam.instituteId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }
        await examService.deleteExam(req.params.id);
        res.json({ success: true, message: 'Exam deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
//# sourceMappingURL=exam.controller.js.map