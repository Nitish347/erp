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
exports.createClassHandler = createClassHandler;
exports.listClassesHandler = listClassesHandler;
exports.getClassByIdHandler = getClassByIdHandler;
exports.updateClassHandler = updateClassHandler;
exports.deleteClassHandler = deleteClassHandler;
const classService = __importStar(require("../services/class.service"));
async function createClassHandler(req, res) {
    try {
        if (!['admin', 'super_admin'].includes(req.user?.role || '')) {
            res.status(403).json({ success: false, message: 'Only admins can create classes' });
            return;
        }
        const classData = await classService.createClass(req.body);
        res.status(201).json({ success: true, data: classData });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
async function listClassesHandler(req, res) {
    try {
        const filter = {};
        if (req.user?.role === 'admin') {
            filter.instituteId = req.user.id;
        }
        if (req.query.instituteId && req.user?.role === 'super_admin') {
            filter.instituteId = req.query.instituteId;
        }
        if (req.query.grade)
            filter.grade = req.query.grade;
        const classes = await classService.listClasses(filter);
        res.json({ success: true, data: classes });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
async function getClassByIdHandler(req, res) {
    try {
        const classData = await classService.getClassById(req.params.id);
        if (!classData) {
            res.status(404).json({ success: false, message: 'Class not found' });
            return;
        }
        if (req.user?.role === 'admin' && classData.instituteId?.toString() !== req.user.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }
        res.json({ success: true, data: classData });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
async function updateClassHandler(req, res) {
    try {
        if (!['admin', 'super_admin'].includes(req.user?.role || '')) {
            res.status(403).json({ success: false, message: 'Only admins can update classes' });
            return;
        }
        const classData = await classService.getClassById(req.params.id);
        if (!classData) {
            res.status(404).json({ success: false, message: 'Class not found' });
            return;
        }
        if (req.user?.role === 'admin' && classData.instituteId?.toString() !== req.user?.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }
        const updated = await classService.updateClass(req.params.id, req.body);
        res.json({ success: true, data: updated });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
async function deleteClassHandler(req, res) {
    try {
        if (!['admin', 'super_admin'].includes(req.user?.role || '')) {
            res.status(403).json({ success: false, message: 'Only admins can delete classes' });
            return;
        }
        const classData = await classService.getClassById(req.params.id);
        if (!classData) {
            res.status(404).json({ success: false, message: 'Class not found' });
            return;
        }
        if (req.user?.role === 'admin' && classData.instituteId?.toString() !== req.user?.id) {
            res.status(403).json({ success: false, message: 'Access denied' });
            return;
        }
        await classService.deleteClass(req.params.id);
        res.json({ success: true, message: 'Class deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
//# sourceMappingURL=class.controller.js.map