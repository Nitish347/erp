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
export declare const hashPassword: (password: string) => Promise<string>;
export declare const comparePassword: (password: string, hashedPassword: string) => Promise<boolean>;
export declare const generateToken: (id: string) => string;
export declare const generateOTP: () => string;
export declare const registerStudent: (data: RegisterData) => Promise<AuthResponse>;
export declare const registerTeacher: (data: RegisterData) => Promise<AuthResponse>;
export declare const loginStudent: (data: LoginData) => Promise<AuthResponse>;
export declare const loginTeacher: (data: LoginData) => Promise<AuthResponse>;
export declare const verifyOTP: (userId: string, otp: string, role: "admin" | "super_admin" | "teacher" | "student") => Promise<boolean>;
export declare const registerAdmin: (data: RegisterData) => Promise<AuthResponse>;
export declare const loginAdmin: (data: LoginData) => Promise<AuthResponse>;
export declare const resendOTP: (userId: string, role: "admin" | "super_admin" | "teacher" | "student") => Promise<void>;
//# sourceMappingURL=auth.service.d.ts.map