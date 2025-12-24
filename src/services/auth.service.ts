import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { StudentModel } from '../models/Student.model';
import { TeacherModel } from '../models/Teacher.model';
import { AdminModel } from '../models/Admin.model';
import { SuperAdminModel } from '../models/SuperAdmin.model';

const DEFAULT_OTP = '4444';



export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  enrollmentNumber?: string;
  class?: string;
  section?: string;
  dateOfBirth?: Date;
  department?: string;
  hireDate?: Date;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    firstName?: string;
    lastName?: string;
    name?: string;
    email: string;
    role: 'admin' | 'super_admin' | 'teacher' | 'student';
    isEmailVerified: boolean;
  };
  token: string;
}

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

export const generateToken = (id: string): string => {
  const secret = process.env.JWT_SECRET || 'your-secret-key';
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
  return jwt.sign({ id }, secret, { expiresIn });
};

export const generateOTP = (): string => {
  return DEFAULT_OTP; // For now, always return 4444
};

export const registerStudent = async (data: RegisterData): Promise<AuthResponse> => {
  const { email, password, ...otherData } = data;

  // Check if student already exists
  const existingStudent = await StudentModel.findOne({ email });
  if (existingStudent) {
    throw new Error('Student with this email already exists');
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Generate OTP
  const otp = generateOTP();
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  // Create student
  const student = new StudentModel({
    ...otherData,
    email,
    password: hashedPassword,
    otp,
    otpExpiry,
    isEmailVerified: false
  });

  await student.save();

  // Generate token
  const token = generateToken((student._id as any).toString());

  return {
    user: {
      id: (student._id as any).toString(),
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      role: 'student',
      isEmailVerified: student.isEmailVerified
    },
    token
  };
};

export const registerTeacher = async (data: RegisterData): Promise<AuthResponse> => {
  const { email, password, ...otherData } = data;

  // Check if teacher already exists
  const existingTeacher = await TeacherModel.findOne({ email });
  if (existingTeacher) {
    throw new Error('Teacher with this email already exists');
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Generate OTP
  const otp = generateOTP();
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  // Create teacher
  const teacher = new TeacherModel({
    ...otherData,
    email,
    password: hashedPassword,
    otp,
    otpExpiry,
    isEmailVerified: false
  });

  await teacher.save();

  // Generate token
  const token = generateToken((teacher._id as any).toString());

  return {
    user: {
      id: (teacher._id as any).toString(),
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      email: teacher.email,
      role: 'teacher',
      isEmailVerified: teacher.isEmailVerified
    },
    token
  };
};

export const loginStudent = async (data: LoginData): Promise<AuthResponse> => {
  const { email, password } = data;

  // Find student
  const student = await StudentModel.findOne({ email });
  if (!student) {
    throw new Error('Invalid email or password');
  }

  // Check password
  const isPasswordValid = await comparePassword(password, student.password);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  // Generate token
  const token = generateToken((student._id as any).toString());

  return {
    user: {
      id: (student._id as any).toString(),
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      role: 'student',
      isEmailVerified: student.isEmailVerified
    },
    token
  };
};

export const loginTeacher = async (data: LoginData): Promise<AuthResponse> => {
  const { email, password } = data;

  // Find teacher
  const teacher = await TeacherModel.findOne({ email });
  if (!teacher) {
    throw new Error('Invalid email or password');
  }

  // Check password
  const isPasswordValid = await comparePassword(password, teacher.password);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  // Generate token
  const token = generateToken((teacher._id as any).toString());

  return {
    user: {
      id: (teacher._id as any).toString(),
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      email: teacher.email,
      role: 'teacher',
      isEmailVerified: teacher.isEmailVerified
    },
    token
  };
};

export const verifyOTP = async (userId: string, otp: string, role: 'admin' | 'super_admin' | 'teacher' | 'student'): Promise<boolean> => {
  let user;
  
  if (role === 'admin') {
    user = await AdminModel.findById(userId);
  } else if (role === 'super_admin') {
    user = await SuperAdminModel.findById(userId);
  } else if (role === 'teacher') {
    user = await TeacherModel.findById(userId);
  } else {
    user = await StudentModel.findById(userId);
  }

  if (!user) {
    throw new Error('User not found');
  }

  if (!user.otp || !user.otpExpiry) {
    throw new Error('No OTP found for this user');
  }

  if (new Date() > user.otpExpiry) {
    throw new Error('OTP has expired');
  }

  if (user.otp !== otp) {
    throw new Error('Invalid OTP');
  }

  // Update user as verified
  user.isEmailVerified = true;
  user.otp = undefined as any;
  user.otpExpiry = undefined as any;
  await user.save();

  return true;
};

export const registerAdmin = async (data: RegisterData): Promise<AuthResponse> => {
  const { email, password, firstName, lastName, ...otherData } = data;

  // Check if admin already exists
  const existingAdmin = await AdminModel.findOne({ email });
  if (existingAdmin) {
    throw new Error('Admin with this email already exists');
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Generate OTP
  const otp = generateOTP();
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  // Create admin
  const admin = new AdminModel({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    otp,
    otpExpiry,
    isEmailVerified: false,
    ...otherData // This includes name, address, etc.
  });

  await admin.save();

  // Generate token
  const token = generateToken((admin._id as any).toString());

  return {
    user: {
      id: (admin._id as any).toString(),
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
      role: 'admin',
      isEmailVerified: admin.isEmailVerified
    },
    token
  };
};



export const loginAdmin = async (data: LoginData): Promise<AuthResponse> => {
  const { email, password } = data;

  // Find admin
  const admin = await AdminModel.findOne({ email });
  if (!admin) {
    throw new Error('Invalid email or password');
  }

  // Check password
  const isPasswordValid = await comparePassword(password, admin.password);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  // Update last login
  admin.lastLogin = new Date();
  await admin.save();

  // Generate token
  const token = generateToken((admin._id as any).toString());

  return {
    user: {
      id: (admin._id as any).toString(),
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
      role: 'admin',
      isEmailVerified: admin.isEmailVerified
    },
    token
  };
};



export const resendOTP = async (userId: string, role: 'admin' | 'super_admin' | 'teacher' | 'student'): Promise<void> => {
  let user;
  
  if (role === 'admin') {
    user = await AdminModel.findById(userId);
  } else if (role === 'super_admin') {
     user = await SuperAdminModel.findById(userId);
  } else if (role === 'teacher') {
    user = await TeacherModel.findById(userId);
  } else {
    user = await StudentModel.findById(userId);
  }

  if (!user) {
    throw new Error('User not found');
  }

  // Generate new OTP
  const otp = generateOTP();
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  user.otp = otp;
  user.otpExpiry = otpExpiry;
  await user.save();
};
