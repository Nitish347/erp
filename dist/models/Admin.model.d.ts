import { Document, Model } from 'mongoose';
export interface Admin extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
    instituteName: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    pincode?: string;
    website?: string;
    establishedYear?: number;
    isEmailVerified: boolean;
    otp?: string;
    otpExpiry?: Date;
    isActive: boolean;
    lastLogin?: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare const AdminModel: Model<Admin>;
//# sourceMappingURL=Admin.model.d.ts.map