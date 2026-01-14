import mongoose, { Document, Model } from 'mongoose';
export interface Student extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
    enrollmentNumber: string;
    rollNumber: string;
    class?: string;
    section?: string;
    gender?: string;
    address?: string;
    dateOfBirth?: Date;
    admissionDate?: Date;
    institute: mongoose.Types.ObjectId;
    teacher?: mongoose.Types.ObjectId;
    isEmailVerified: boolean;
    otp?: string;
    otpExpiry?: Date;
    guardian?: {
        name: string;
        phone: string;
        email?: string;
        relation?: string;
    };
    createdAt: Date;
    updatedAt: Date;
}
export declare const StudentModel: Model<Student>;
//# sourceMappingURL=Student.model.d.ts.map