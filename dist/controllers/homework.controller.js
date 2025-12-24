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
exports.createHomeworkHandler = createHomeworkHandler;
exports.listHomeworkHandler = listHomeworkHandler;
exports.getHomeworkByIdHandler = getHomeworkByIdHandler;
exports.updateHomeworkHandler = updateHomeworkHandler;
exports.deleteHomeworkHandler = deleteHomeworkHandler;
const homeworkService = __importStar(require("../services/homework.service"));
async function createHomeworkHandler(req, res) {
    try {
        // Only teachers, admins, and super_admins can create homework
        if (!req.user || !['teacher', 'admin', 'super_admin'].includes(req.user.role)) {
            res.status(403).json({ success: false, message: 'Only teachers and admins can create homework' });
            return;
        }
        // If teacher, set teacherId automatically
        if (req.user.role === 'teacher') {
            req.body.teacherId = req.user.id;
        }
        const homework = await homeworkService.createHomework(req.body);
        res.status(201).json({ success: true, data: homework });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
async function listHomeworkHandler(req, res) {
    try {
        const filter = {};
        // Apply role-based filtering
        if (req.user?.role === 'admin') {
            filter.instituteId = req.user.id;
        }
        else if (req.user?.role === 'teacher') {
            filter.teacherId = req.user.id;
        }
        else if (req.user?.role === 'student') {
            // Students see homework assigned to them
            const { classId, section } = req.query;
            if (classId && section) {
                filter.classId = classId;
                filter.section = section;
            }
        }
        // Apply query filters
        if (req.query.classId && req.user?.role !== 'student')
            filter.classId = req.query.classId;
        if (req.query.section)
            filter.section = req.query.section;
        if (req.query.subject)
            filter.subject = req.query.subject;
        const homework = await homeworkService.listHomework(filter);
        res.json({ success: true, data: homework });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
async function getHomeworkByIdHandler(req, res) {
    try {
        const homework = await homeworkService.getHomeworkById(req.params.id);
        if (!homework) {
            res.status(404).json({ success: false, message: 'Homework not found' });
            return;
        }
        // Verify access rights
        if (req.user?.role === 'admin' && homework.instituteId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }
        if (req.user?.role === 'teacher' && homework.teacherId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }
        res.json({ success: true, data: homework });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
async function updateHomeworkHandler(req, res) {
    try {
        const homework = await homeworkService.getHomeworkById(req.params.id);
        if (!homework) {
            res.status(404).json({ success: false, message: 'Homework not found' });
            return;
        }
        // Verify ownership
        if (req.user?.role === 'teacher' && homework.teacherId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'You can only update your own homework' });
            return;
        }
        if (req.user?.role === 'admin' && homework.instituteId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }
        const updated = await homeworkService.updateHomework(req.params.id, req.body);
        res.json({ success: true, data: updated });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
async function deleteHomeworkHandler(req, res) {
    try {
        const homework = await homeworkService.getHomeworkById(req.params.id);
        if (!homework) {
            res.status(404).json({ success: false, message: 'Homework not found' });
            return;
        }
        // Verify ownership
        if (req.user?.role === 'teacher' && homework.teacherId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'You can only delete your own homework' });
            return;
        }
        if (req.user?.role === 'admin' && homework.instituteId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }
        await homeworkService.deleteHomework(req.params.id);
        res.json({ success: true, message: 'Homework deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
//# sourceMappingURL=homework.controller.js.map