import mongoose, { Schema, Document, Model } from 'mongoose';

export interface Admin extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  
  // Institute Details
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

const AdminSchema: Schema<Admin> = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    phone: { type: String },
    
    // Institute Details
    instituteName: { type: String, required: true, trim: true },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String, default: 'India' },
    pincode: { type: String },
    website: { type: String },
    establishedYear: { type: Number },
    
    isEmailVerified: { type: Boolean, default: false },
    otp: { type: String },
    otpExpiry: { type: Date },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date },
  },
  { timestamps: true }
);

export const AdminModel: Model<Admin> =
  mongoose.models.Admin || mongoose.model<Admin>('Admin', AdminSchema);
