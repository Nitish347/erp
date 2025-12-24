import mongoose, { Schema, Document, Model } from 'mongoose';

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

const SuperAdminSchema: Schema<SuperAdmin> = new Schema(
    {
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        password: { type: String, required: true, minlength: 6 },
        phone: { type: String },
        isEmailVerified: { type: Boolean, default: false },
        otp: { type: String },
        otpExpiry: { type: Date },
    },
    { timestamps: true }
);

export const SuperAdminModel: Model<SuperAdmin> =
    mongoose.models.SuperAdmin || mongoose.model<SuperAdmin>('SuperAdmin', SuperAdminSchema);
