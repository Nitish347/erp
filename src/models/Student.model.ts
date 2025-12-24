import mongoose, { Schema, Document, Model } from 'mongoose';

export interface Student extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  enrollmentNumber: string;
  class?: string;
  section?: string;
  dateOfBirth?: Date;
  institute: mongoose.Types.ObjectId; // Reference to Admin (Institute)
  teacher?: mongoose.Types.ObjectId; // Reference to Teacher (optional)
  isEmailVerified: boolean;
  otp?: string;
  otpExpiry?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const StudentSchema: Schema<Student> = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    phone: { type: String },
    enrollmentNumber: { type: String, required: true, unique: true, trim: true },
    class: { type: String },
    section: { type: String },
    dateOfBirth: { type: Date },
    institute: { type: Schema.Types.ObjectId, ref: 'Admin', required: true },
    teacher: { type: Schema.Types.ObjectId, ref: 'Teacher' },
    isEmailVerified: { type: Boolean, default: false },
    otp: { type: String },
    otpExpiry: { type: Date },
  },
  { timestamps: true }
);

export const StudentModel: Model<Student> =
  mongoose.models.Student || mongoose.model<Student>('Student', StudentSchema);


