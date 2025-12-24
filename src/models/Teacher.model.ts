import mongoose, { Schema, Document, Model } from 'mongoose';

export interface Teacher extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  department?: string;
  hireDate?: Date;
  institute: mongoose.Types.ObjectId; // Reference to Admin (Institute)
  isEmailVerified: boolean;
  otp?: string;
  otpExpiry?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TeacherSchema: Schema<Teacher> = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    phone: { type: String },
    department: { type: String },
    hireDate: { type: Date },
    institute: { type: Schema.Types.ObjectId, ref: 'Admin', required: true },
    isEmailVerified: { type: Boolean, default: false },
    otp: { type: String },
    otpExpiry: { type: Date },
  },
  { timestamps: true }
);

export const TeacherModel: Model<Teacher> =
  mongoose.models.Teacher || mongoose.model<Teacher>('Teacher', TeacherSchema);


