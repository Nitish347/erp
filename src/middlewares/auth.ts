import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { StudentModel, Student } from '../models/Student.model';
import { TeacherModel, ITeacher } from '../models/Teacher.model';
import { AdminModel, Admin } from '../models/Admin.model';
import { SuperAdminModel, SuperAdmin } from '../models/SuperAdmin.model';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: 'super_admin' | 'admin' | 'teacher' | 'student';
  };
}

export const authenticateToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      res.status(401).json({ success: false, message: 'Access token required' });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;

    // Check if user exists in any collection (SuperAdmin, Admin, Institute, Teacher, Student)
    let user: SuperAdmin | Admin | ITeacher | Student | null = await SuperAdminModel.findById(decoded.id);
    let role: 'super_admin' | 'admin' | 'teacher' | 'student' = 'super_admin';

    if (!user) {
      user = await AdminModel.findById(decoded.id);
      role = 'admin';
    }



    if (!user) {
      user = await TeacherModel.findById(decoded.id);
      role = 'teacher';
    }

    if (!user) {
      user = await StudentModel.findById(decoded.id);
      role = 'student';
    }

    if (!user) {
      res.status(401).json({ success: false, message: 'Invalid token' });
      return;
    }

    req.user = {
      id: (user._id as any).toString(),
      email: user.email,
      role
    };

    next();
  } catch (error: any) {
    console.error('JWT Verification Error:', error.message);
    res.status(403).json({ success: false, message: 'Invalid or expired token', error: error.message });
  }
};

export const requireRole = (roles: ('super_admin' | 'admin' | 'teacher' | 'student')[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
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
