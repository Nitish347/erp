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
exports.createSubmissionHandler = createSubmissionHandler;
exports.listSubmissionsHandler = listSubmissionsHandler;
exports.getSubmissionByIdHandler = getSubmissionByIdHandler;
exports.updateSubmissionHandler = updateSubmissionHandler;
exports.gradeSubmissionHandler = gradeSubmissionHandler;
const submissionService = __importStar(require("../services/homeworkSubmission.service"));
async function createSubmissionHandler(req, res) {
    try {
        // Only students can create submissions
        if (req.user?.role === 'student') {
            req.body.studentId = req.user.id;
            req.body.status = 'submitted';
            req.body.submittedAt = new Date();
        }
        else if (!['admin', 'institute', 'super_admin'].includes(req.user?.role || '')) {
            res.status(403).json({ success: false, message: 'Only students can create submissions' });
            return;
        }
        const submission = await submissionService.createSubmission(req.body);
        res.status(201).json({ success: true, data: submission });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
async function listSubmissionsHandler(req, res) {
    try {
        const filter = {};
        if (req.query.homeworkId)
            filter.homeworkId = req.query.homeworkId;
        if (req.query.status)
            filter.status = req.query.status;
        // Role-based filtering
        if (req.user?.role === 'student') {
            filter.studentId = req.user.id;
        }
        const submissions = await submissionService.listSubmissions(filter);
        res.json({ success: true, data: submissions });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
async function getSubmissionByIdHandler(req, res) {
    try {
        const submission = await submissionService.getSubmissionById(req.params.id);
        if (!submission) {
            res.status(404).json({ success: false, message: 'Submission not found' });
            return;
        }
        // Verify access
        if (req.user?.role === 'student' && submission.studentId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }
        res.json({ success: true, data: submission });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
async function updateSubmissionHandler(req, res) {
    try {
        const submission = await submissionService.getSubmissionById(req.params.id);
        if (!submission) {
            res.status(404).json({ success: false, message: 'Submission not found' });
            return;
        }
        // Students can only update their own pending submissions
        if (req.user?.role === 'student') {
            if (submission.studentId?.toString() !== req.user.id) {
                res.status(403).json({ success: false, message: 'Access denied' });
                return;
            }
            if (submission.status === 'graded') {
                res.status(403).json({ success: false, message: 'Cannot update graded submission' });
                return;
            }
        }
        const updated = await submissionService.updateSubmission(req.params.id, req.body);
        res.json({ success: true, data: updated });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
async function gradeSubmissionHandler(req, res) {
    try {
        // Only teachers and admins can grade
        if (!['teacher', 'admin', 'institute', 'super_admin'].includes(req.user?.role || '')) {
            res.status(403).json({ success: false, message: 'Only teachers and admins can grade submissions' });
            return;
        }
        const { marksObtained, feedback } = req.body;
        const graded = await submissionService.gradeSubmission(req.params.id, marksObtained, feedback);
        if (!graded) {
            res.status(404).json({ success: false, message: 'Submission not found' });
            return;
        }
        res.json({ success: true, data: graded });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
//# sourceMappingURL=homeworkSubmission.controller.js.map