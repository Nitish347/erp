"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerStudentHandler = registerStudentHandler;
exports.registerTeacherHandler = registerTeacherHandler;
exports.loginStudentHandler = loginStudentHandler;
exports.loginTeacherHandler = loginTeacherHandler;
exports.verifyOTPHandler = verifyOTPHandler;
exports.registerAdminHandler = registerAdminHandler;
exports.registerSuperAdminHandler = registerSuperAdminHandler;
exports.loginAdminHandler = loginAdminHandler;
exports.loginSuperAdminHandler = loginSuperAdminHandler;
exports.resendOTPHandler = resendOTPHandler;
const auth_service_1 = require("../services/auth.service");
async function registerStudentHandler(req, res) {
    try {
        const result = await (0, auth_service_1.registerStudent)(req.body);
        res.status(201).json({
            success: true,
            message: 'Student registered successfully. Please verify your email with the OTP sent.',
            data: result
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}
async function registerTeacherHandler(req, res) {
    try {
        const result = await (0, auth_service_1.registerTeacher)(req.body);
        res.status(201).json({
            success: true,
            message: 'Teacher registered successfully. Please verify your email with the OTP sent.',
            data: result
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}
async function loginStudentHandler(req, res) {
    try {
        const result = await (0, auth_service_1.loginStudent)(req.body);
        res.json({
            success: true,
            message: 'Student logged in successfully',
            data: result
        });
    }
    catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        });
    }
}
async function loginTeacherHandler(req, res) {
    try {
        const result = await (0, auth_service_1.loginTeacher)(req.body);
        res.json({
            success: true,
            message: 'Teacher logged in successfully',
            data: result
        });
    }
    catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        });
    }
}
async function verifyOTPHandler(req, res) {
    try {
        const { userId, otp, role } = req.body;
        if (!userId || !otp || !role) {
            res.status(400).json({
                success: false,
                message: 'userId, otp, and role are required'
            });
            return;
        }
        if (!['admin', 'institute', 'teacher', 'student'].includes(role)) {
            res.status(400).json({
                success: false,
                message: 'Role must be admin, institute, teacher, or student'
            });
            return;
        }
        await (0, auth_service_1.verifyOTP)(userId, otp, role);
        res.json({
            success: true,
            message: 'Email verified successfully'
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}
async function registerAdminHandler(req, res) {
    try {
        const result = await (0, auth_service_1.registerAdmin)(req.body);
        res.status(201).json({
            success: true,
            message: 'Admin (Institute) registered successfully. Please verify your email with the OTP sent.',
            data: result
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}
async function registerSuperAdminHandler(req, res) {
    try {
        const result = await (0, auth_service_1.registerSuperAdmin)(req.body);
        res.status(201).json({
            success: true,
            message: 'Super Admin registered successfully.',
            data: result
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}
async function loginAdminHandler(req, res) {
    try {
        const result = await (0, auth_service_1.loginAdmin)(req.body);
        res.json({
            success: true,
            message: 'Admin logged in successfully',
            data: result
        });
    }
    catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        });
    }
}
async function loginSuperAdminHandler(req, res) {
    try {
        const result = await (0, auth_service_1.loginSuperAdmin)(req.body);
        res.json({
            success: true,
            message: 'Super Admin logged in successfully',
            data: result
        });
    }
    catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        });
    }
}
async function resendOTPHandler(req, res) {
    try {
        const { userId, role } = req.body;
        if (!userId || !role) {
            res.status(400).json({
                success: false,
                message: 'userId and role are required'
            });
            return;
        }
        if (!['admin', 'institute', 'teacher', 'student'].includes(role)) {
            res.status(400).json({
                success: false,
                message: 'Role must be admin, institute, teacher, or student'
            });
            return;
        }
        await (0, auth_service_1.resendOTP)(userId, role);
        res.json({
            success: true,
            message: 'OTP resent successfully'
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}
//# sourceMappingURL=auth.controller.js.map