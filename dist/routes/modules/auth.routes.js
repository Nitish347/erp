"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../../controllers/auth.controller");
const router = (0, express_1.Router)();
// Registration routes
router.post('/register/super-admin', auth_controller_1.registerSuperAdminHandler);
router.post('/register/admin', auth_controller_1.registerAdminHandler);
router.post('/register/student', auth_controller_1.registerStudentHandler);
router.post('/register/teacher', auth_controller_1.registerTeacherHandler);
// Login routes
router.post('/login/super-admin', auth_controller_1.loginSuperAdminHandler);
router.post('/login/admin', auth_controller_1.loginAdminHandler);
router.post('/login/student', auth_controller_1.loginStudentHandler);
router.post('/login/teacher', auth_controller_1.loginTeacherHandler);
// OTP verification routes
router.post('/verify-otp', auth_controller_1.verifyOTPHandler);
router.post('/resend-otp', auth_controller_1.resendOTPHandler);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map