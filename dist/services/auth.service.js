"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resendOTP = exports.loginSuperAdmin = exports.loginAdmin = exports.registerSuperAdmin = exports.registerAdmin = exports.verifyOTP = exports.loginTeacher = exports.loginStudent = exports.registerTeacher = exports.registerStudent = exports.generateOTP = exports.generateToken = exports.comparePassword = exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Student_model_1 = require("../models/Student.model");
const Teacher_model_1 = require("../models/Teacher.model");
const Admin_model_1 = require("../models/Admin.model");
const SuperAdmin_model_1 = require("../models/SuperAdmin.model");
const DEFAULT_OTP = '4444';
const hashPassword = async (password) => {
    const saltRounds = 12;
    return await bcryptjs_1.default.hash(password, saltRounds);
};
exports.hashPassword = hashPassword;
const comparePassword = async (password, hashedPassword) => {
    return await bcryptjs_1.default.compare(password, hashedPassword);
};
exports.comparePassword = comparePassword;
const generateToken = (id) => {
    const secret = process.env.JWT_SECRET || 'your-secret-key';
    const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
    return jsonwebtoken_1.default.sign({ id }, secret, { expiresIn });
};
exports.generateToken = generateToken;
const generateOTP = () => {
    return DEFAULT_OTP; // For now, always return 4444
};
exports.generateOTP = generateOTP;
const registerStudent = async (data) => {
    const { email, password, ...otherData } = data;
    // Check if student already exists
    const existingStudent = await Student_model_1.StudentModel.findOne({ email });
    if (existingStudent) {
        throw new Error('Student with this email already exists');
    }
    // Hash password
    const hashedPassword = await (0, exports.hashPassword)(password);
    // Generate OTP
    const otp = (0, exports.generateOTP)();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    // Create student
    const student = new Student_model_1.StudentModel({
        ...otherData,
        email,
        password: hashedPassword,
        otp,
        otpExpiry,
        isEmailVerified: false
    });
    await student.save();
    // Generate token
    const token = (0, exports.generateToken)(student._id.toString());
    return {
        user: {
            id: student._id.toString(),
            firstName: student.firstName,
            lastName: student.lastName,
            email: student.email,
            role: 'student',
            isEmailVerified: student.isEmailVerified
        },
        token
    };
};
exports.registerStudent = registerStudent;
const registerTeacher = async (data) => {
    const { email, password, ...otherData } = data;
    // Check if teacher already exists
    const existingTeacher = await Teacher_model_1.TeacherModel.findOne({ email });
    if (existingTeacher) {
        throw new Error('Teacher with this email already exists');
    }
    // Hash password
    const hashedPassword = await (0, exports.hashPassword)(password);
    // Generate OTP
    const otp = (0, exports.generateOTP)();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    // Create teacher
    const teacher = new Teacher_model_1.TeacherModel({
        ...otherData,
        email,
        password: hashedPassword,
        otp,
        otpExpiry,
        isEmailVerified: false
    });
    await teacher.save();
    // Generate token
    const token = (0, exports.generateToken)(teacher._id.toString());
    return {
        user: {
            id: teacher._id.toString(),
            firstName: teacher.firstName,
            lastName: teacher.lastName,
            email: teacher.email,
            role: 'teacher',
            isEmailVerified: teacher.isEmailVerified
        },
        token
    };
};
exports.registerTeacher = registerTeacher;
const loginStudent = async (data) => {
    const { email, password } = data;
    // Find student
    const student = await Student_model_1.StudentModel.findOne({ email });
    if (!student) {
        throw new Error('Invalid email or password');
    }
    // Check password
    const isPasswordValid = await (0, exports.comparePassword)(password, student.password);
    if (!isPasswordValid) {
        throw new Error('Invalid email or password');
    }
    // Generate token
    const token = (0, exports.generateToken)(student._id.toString());
    return {
        user: {
            id: student._id.toString(),
            firstName: student.firstName,
            lastName: student.lastName,
            email: student.email,
            role: 'student',
            isEmailVerified: student.isEmailVerified
        },
        token
    };
};
exports.loginStudent = loginStudent;
const loginTeacher = async (data) => {
    const { email, password } = data;
    // Find teacher
    const teacher = await Teacher_model_1.TeacherModel.findOne({ email });
    if (!teacher) {
        throw new Error('Invalid email or password');
    }
    // Check password
    const isPasswordValid = await (0, exports.comparePassword)(password, teacher.password);
    if (!isPasswordValid) {
        throw new Error('Invalid email or password');
    }
    // Generate token
    const token = (0, exports.generateToken)(teacher._id.toString());
    return {
        user: {
            id: teacher._id.toString(),
            firstName: teacher.firstName,
            lastName: teacher.lastName,
            email: teacher.email,
            role: 'teacher',
            isEmailVerified: teacher.isEmailVerified
        },
        token
    };
};
exports.loginTeacher = loginTeacher;
const verifyOTP = async (userId, otp, role) => {
    let user;
    if (role === 'admin') {
        user = await Admin_model_1.AdminModel.findById(userId);
    }
    else if (role === 'super_admin') {
        user = await SuperAdmin_model_1.SuperAdminModel.findById(userId);
    }
    else if (role === 'teacher') {
        user = await Teacher_model_1.TeacherModel.findById(userId);
    }
    else {
        user = await Student_model_1.StudentModel.findById(userId);
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
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();
    return true;
};
exports.verifyOTP = verifyOTP;
const registerAdmin = async (data) => {
    const { email, password, firstName, lastName, ...otherData } = data;
    // Check if admin already exists
    const existingAdmin = await Admin_model_1.AdminModel.findOne({ email });
    if (existingAdmin) {
        throw new Error('Admin with this email already exists');
    }
    // Hash password
    const hashedPassword = await (0, exports.hashPassword)(password);
    // Generate OTP
    const otp = (0, exports.generateOTP)();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    // Create admin
    const admin = new Admin_model_1.AdminModel({
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
    const token = (0, exports.generateToken)(admin._id.toString());
    return {
        user: {
            id: admin._id.toString(),
            firstName: admin.firstName,
            lastName: admin.lastName,
            email: admin.email,
            role: 'admin',
            isEmailVerified: admin.isEmailVerified
        },
        token
    };
};
exports.registerAdmin = registerAdmin;
const registerSuperAdmin = async (data) => {
    const { email, password, firstName, lastName, phone } = data;
    // Check if super admin already exists
    const existingSuperAdmin = await SuperAdmin_model_1.SuperAdminModel.findOne({ email });
    if (existingSuperAdmin) {
        throw new Error('Super Admin with this email already exists');
    }
    // Hash password
    const hashedPassword = await (0, exports.hashPassword)(password);
    // Create super admin
    const superAdmin = new SuperAdmin_model_1.SuperAdminModel({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phone,
        isEmailVerified: true // Auto-verify super admin
    });
    await superAdmin.save();
    // Generate token
    const token = (0, exports.generateToken)(superAdmin._id.toString());
    return {
        user: {
            id: superAdmin._id.toString(),
            firstName: superAdmin.firstName,
            lastName: superAdmin.lastName,
            email: superAdmin.email,
            role: 'super_admin',
            isEmailVerified: superAdmin.isEmailVerified
        },
        token
    };
};
exports.registerSuperAdmin = registerSuperAdmin;
const loginAdmin = async (data) => {
    const { email, password } = data;
    // Find admin
    const admin = await Admin_model_1.AdminModel.findOne({ email });
    if (!admin) {
        throw new Error('Invalid email or password');
    }
    // Check password
    const isPasswordValid = await (0, exports.comparePassword)(password, admin.password);
    if (!isPasswordValid) {
        throw new Error('Invalid email or password');
    }
    // Update last login
    admin.lastLogin = new Date();
    await admin.save();
    // Generate token
    const token = (0, exports.generateToken)(admin._id.toString());
    return {
        user: {
            id: admin._id.toString(),
            firstName: admin.firstName,
            lastName: admin.lastName,
            email: admin.email,
            role: 'admin',
            isEmailVerified: admin.isEmailVerified
        },
        token
    };
};
exports.loginAdmin = loginAdmin;
const loginSuperAdmin = async (data) => {
    const { email, password } = data;
    // Find super admin
    const superAdmin = await SuperAdmin_model_1.SuperAdminModel.findOne({ email });
    if (!superAdmin) {
        throw new Error('Invalid email or password');
    }
    // Check password
    const isPasswordValid = await (0, exports.comparePassword)(password, superAdmin.password);
    if (!isPasswordValid) {
        throw new Error('Invalid email or password');
    }
    // Generate token
    const token = (0, exports.generateToken)(superAdmin._id.toString());
    return {
        user: {
            id: superAdmin._id.toString(),
            firstName: superAdmin.firstName,
            lastName: superAdmin.lastName,
            email: superAdmin.email,
            role: 'super_admin',
            isEmailVerified: superAdmin.isEmailVerified
        },
        token
    };
};
exports.loginSuperAdmin = loginSuperAdmin;
const resendOTP = async (userId, role) => {
    let user;
    if (role === 'admin') {
        user = await Admin_model_1.AdminModel.findById(userId);
    }
    else if (role === 'super_admin') {
        user = await SuperAdmin_model_1.SuperAdminModel.findById(userId);
    }
    else if (role === 'teacher') {
        user = await Teacher_model_1.TeacherModel.findById(userId);
    }
    else {
        user = await Student_model_1.StudentModel.findById(userId);
    }
    if (!user) {
        throw new Error('User not found');
    }
    // Generate new OTP
    const otp = (0, exports.generateOTP)();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();
};
exports.resendOTP = resendOTP;
//# sourceMappingURL=auth.service.js.map