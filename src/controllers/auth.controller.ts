import { Request, Response } from 'express';
import {
  registerStudent,
  registerTeacher,
  registerAdmin,
  registerSuperAdmin,
  loginStudent,
  loginTeacher,
  loginAdmin,
  loginSuperAdmin,
  verifyOTP,
  resendOTP
} from '../services/auth.service';

export async function registerStudentHandler(req: Request, res: Response): Promise<void> {
  try {
    const result = await registerStudent(req.body);
    res.status(201).json({
      success: true,
      message: 'Student registered successfully. Please verify your email with the OTP sent.',
      data: result
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}

export async function registerTeacherHandler(req: Request, res: Response): Promise<void> {
  try {
    const result = await registerTeacher(req.body);
    res.status(201).json({
      success: true,
      message: 'Teacher registered successfully. Please verify your email with the OTP sent.',
      data: result
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}

export async function loginStudentHandler(req: Request, res: Response): Promise<void> {
  try {
    const result = await loginStudent(req.body);
    res.json({
      success: true,
      message: 'Student logged in successfully',
      data: result
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error.message
    });
  }
}

export async function loginTeacherHandler(req: Request, res: Response): Promise<void> {
  try {
    const result = await loginTeacher(req.body);
    res.json({
      success: true,
      message: 'Teacher logged in successfully',
      data: result
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error.message
    });
  }
}

export async function verifyOTPHandler(req: Request, res: Response): Promise<void> {
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

    await verifyOTP(userId, otp, role);
    res.json({
      success: true,
      message: 'Email verified successfully'
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}

export async function registerAdminHandler(req: Request, res: Response): Promise<void> {
  try {
    const result = await registerAdmin(req.body);
    res.status(201).json({
      success: true,
      message: 'Admin (Institute) registered successfully. Please verify your email with the OTP sent.',
      data: result
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}

export async function registerSuperAdminHandler(req: Request, res: Response): Promise<void> {
  try {
    const result = await registerSuperAdmin(req.body);
    res.status(201).json({
      success: true,
      message: 'Super Admin registered successfully.',
      data: result
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}



export async function loginAdminHandler(req: Request, res: Response): Promise<void> {
  try {
    const result = await loginAdmin(req.body);
    res.json({
      success: true,
      message: 'Admin logged in successfully',
      data: result
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error.message
    });
  }
}

export async function loginSuperAdminHandler(req: Request, res: Response): Promise<void> {
  try {
    const result = await loginSuperAdmin(req.body);
    res.json({
      success: true,
      message: 'Super Admin logged in successfully',
      data: result
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error.message
    });
  }
}



export async function resendOTPHandler(req: Request, res: Response): Promise<void> {
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

    await resendOTP(userId, role);
    res.json({
      success: true,
      message: 'OTP resent successfully'
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}
