"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Student_model_1 = require("../models/Student.model");
const Teacher_model_1 = require("../models/Teacher.model");
const Admin_model_1 = require("../models/Admin.model");
const SuperAdmin_model_1 = require("../models/SuperAdmin.model");
const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
        if (!token) {
            res.status(401).json({ success: false, message: 'Access token required' });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        // Check if user exists in any collection (SuperAdmin, Admin, Institute, Teacher, Student)
        let user = await SuperAdmin_model_1.SuperAdminModel.findById(decoded.id);
        let role = 'super_admin';
        if (!user) {
            user = await Admin_model_1.AdminModel.findById(decoded.id);
            role = 'admin';
        }
        if (!user) {
            user = await Teacher_model_1.TeacherModel.findById(decoded.id);
            role = 'teacher';
        }
        if (!user) {
            user = await Student_model_1.StudentModel.findById(decoded.id);
            role = 'student';
        }
        if (!user) {
            res.status(401).json({ success: false, message: 'Invalid token' });
            return;
        }
        req.user = {
            id: user._id.toString(),
            email: user.email,
            role
        };
        next();
    }
    catch (error) {
        console.error('JWT Verification Error:', error.message);
        res.status(403).json({ success: false, message: 'Invalid or expired token', error: error.message });
    }
};
exports.authenticateToken = authenticateToken;
const requireRole = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            res.status(401).json({ success: false, message: 'Authentication required' });
            return;
        }
        // Super admin has access to everything
        if (req.user.role === 'super_admin') {
            next();
            return;
        }
        if (!roles.includes(req.user.role)) {
            res.status(403).json({ success: false, message: 'Insufficient permissions' });
            return;
        }
        next();
    };
};
exports.requireRole = requireRole;
//# sourceMappingURL=auth.js.map