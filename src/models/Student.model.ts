import mongoose, { Schema, Document, Model } from 'mongoose';

export interface Student extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  enrollmentNumber: string;
  class?: string;
  section?: string;
  dateOfBirth?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const StudentSchema: Schema<Student> = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String },
    enrollmentNumber: { type: String, required: true, unique: true, trim: true },
    class: { type: String },
    section: { type: String },
    dateOfBirth: { type: Date },
  },
  { timestamps: true }
);

export const StudentModel: Model<Student> =
  mongoose.models.Student || mongoose.model<Student>('Student', StudentSchema);


