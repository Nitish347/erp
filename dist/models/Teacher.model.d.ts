import mongoose, { Document, Model } from 'mongoose';
export interface ITeacher extends Document {
    _id: mongoose.Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
    department?: string;
    hireDate?: Date;
    institute: mongoose.Types.ObjectId;
    isEmailVerified: boolean;
    otp?: string;
    otpExpiry?: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare const TeacherModel: Model<ITeacher>;
//# sourceMappingURL=Teacher.model.d.ts.map