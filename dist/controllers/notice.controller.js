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
exports.createNoticeHandler = createNoticeHandler;
exports.listNoticesHandler = listNoticesHandler;
exports.getNoticeByIdHandler = getNoticeByIdHandler;
exports.updateNoticeHandler = updateNoticeHandler;
exports.deleteNoticeHandler = deleteNoticeHandler;
const noticeService = __importStar(require("../services/notice.service"));
async function createNoticeHandler(req, res) {
    try {
        if (!['teacher', 'admin', 'super_admin'].includes(req.user?.role || '')) {
            res.status(403).json({ success: false, message: 'Only teachers and admins can create notices' });
            return;
        }
        req.body.issuedBy = req.user.id;
        req.body.issuedByRole = req.user.role === 'teacher' ? 'teacher' : 'admin';
        req.body.issuedDate = new Date();
        // Set instituteId from authenticated admin user
        if (req.user.role === 'admin' || req.user.role === 'super_admin') {
            req.body.instituteId = req.user.id;
        }
        const notice = await noticeService.createNotice(req.body);
        res.status(201).json({ success: true, data: notice });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
async function listNoticesHandler(req, res) {
    try {
        const filter = {};
        if (req.user?.role === 'admin') {
            filter.instituteId = req.user.id;
        }
        if (req.query.instituteId && req.user?.role === 'super_admin') {
            filter.instituteId = req.query.instituteId;
        }
        const notices = await noticeService.listNotices(filter);
        res.json({ success: true, data: notices });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
async function getNoticeByIdHandler(req, res) {
    try {
        const notice = await noticeService.getNoticeById(req.params.id);
        if (!notice) {
            res.status(404).json({ success: false, message: 'Notice not found' });
            return;
        }
        if (req.user?.role === 'admin' && notice.instituteId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }
        res.json({ success: true, data: notice });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
async function updateNoticeHandler(req, res) {
    try {
        const notice = await noticeService.getNoticeById(req.params.id);
        if (!notice) {
            res.status(404).json({ success: false, message: 'Notice not found' });
            return;
        }
        // Only creator or admin can update
        if (req.user?.role === 'teacher' && notice.issuedBy?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'You can only update your own notices' });
            return;
        }
        if (req.user?.role === 'admin' && notice.instituteId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }
        const updated = await noticeService.updateNotice(req.params.id, req.body);
        res.json({ success: true, data: updated });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
async function deleteNoticeHandler(req, res) {
    try {
        const notice = await noticeService.getNoticeById(req.params.id);
        if (!notice) {
            res.status(404).json({ success: false, message: 'Notice not found' });
            return;
        }
        // Only creator or admin can delete
        if (req.user?.role === 'teacher' && notice.issuedBy?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'You can only delete your own notices' });
            return;
        }
        if (req.user?.role === 'admin' && notice.instituteId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }
        await noticeService.deleteNotice(req.params.id);
        res.json({ success: true, message: 'Notice deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
//# sourceMappingURL=notice.controller.js.map