import mongoose, { Document, Model } from 'mongoose';
export interface Teacher extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
    department?: string;
    hireDate?: Date;
    institute: mongoose.Types.ObjectId;
    isEmailVerified: boolean;
    otp?: string;
    otpExpiry?: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare const TeacherModel: Model<Teacher>;
//# sourceMappingURL=Teacher.model.d.ts.map