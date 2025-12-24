import { Router } from 'express';
import {
  registerStudentHandler,
  registerTeacherHandler,
  registerAdminHandler,
  loginStudentHandler,
  loginTeacherHandler,
  loginAdminHandler,
  verifyOTPHandler,
  resendOTPHandler
} from '../../controllers/auth.controller';

const router = Router();

// Registration routes
router.post('/register/admin', registerAdminHandler);
router.post('/register/institute', registerAdminHandler);
router.post('/register/student', registerStudentHandler);
router.post('/register/teacher', registerTeacherHandler);

// Login routes
router.post('/login/admin', loginAdminHandler);
router.post('/login/institute', loginAdminHandler);
router.post('/login/student', loginStudentHandler);
router.post('/login/teacher', loginTeacherHandler);

// OTP verification routes
router.post('/verify-otp', verifyOTPHandler);
router.post('/resend-otp', resendOTPHandler);

export default router;
