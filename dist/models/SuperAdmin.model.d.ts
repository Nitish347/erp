import { Document, Model } from 'mongoose';
export interface SuperAdmin extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
    isEmailVerified: boolean;
    otp?: string;
    otpExpiry?: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare const SuperAdminModel: Model<SuperAdmin>;
//# sourceMappingURL=SuperAdmin.model.d.ts.map