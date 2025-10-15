import mongoose, { Schema, Document, Model } from 'mongoose';

export interface Teacher extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  department?: string;
  hireDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TeacherSchema: Schema<Teacher> = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String },
    department: { type: String },
    hireDate: { type: Date },
  },
  { timestamps: true }
);

export const TeacherModel: Model<Teacher> =
  mongoose.models.Teacher || mongoose.model<Teacher>('Teacher', TeacherSchema);


