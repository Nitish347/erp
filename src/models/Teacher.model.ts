import mongoose, { Schema, Document, Model } from 'mongoose';

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
  institute: mongoose.Types.ObjectId; // Reference to Admin (Institute)
  isEmailVerified: boolean;
  otp?: string;
  otpExpiry?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TeacherSchema: Schema<ITeacher> = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    phone: { type: String },
    address: { type: String },
    department: { type: String },
    hireDate: { type: Date },
    institute: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
    isEmailVerified: { type: Boolean, default: false },
    otp: { type: String },
    otpExpiry: { type: Date },
  },
  { timestamps: true }
);

export const TeacherModel: Model<ITeacher> =
  mongoose.models.Teacher || mongoose.model<ITeacher>('Teacher', TeacherSchema);


