import mongoose, { Schema, Document, Model } from 'mongoose';

export interface Attendance extends Document {
  teacherId: mongoose.Types.ObjectId;
  studentId?: mongoose.Types.ObjectId; // Optional for teacher-only attendance
  date: Date;
  status: 'Present' | 'Absent' | 'Late' | 'Excused';
  subject?: string;
  class?: string;
  section?: string;
  remarks?: string;
  markedBy: mongoose.Types.ObjectId; // Who marked the attendance
  markedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AttendanceSchema: Schema<Attendance> = new Schema(
  {
    teacherId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Teacher', 
      required: true 
    },
    studentId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Student' 
    },
    date: { 
      type: Date, 
      required: true,
      default: Date.now
    },
    status: { 
      type: String, 
      required: true, 
      enum: ['Present', 'Absent', 'Late', 'Excused'] 
    },
    subject: { 
      type: String, 
      trim: true 
    },
    class: { 
      type: String, 
      trim: true 
    },
    section: { 
      type: String, 
      trim: true 
    },
    remarks: { 
      type: String, 
      trim: true 
    },
    markedBy: { 
      type: Schema.Types.ObjectId, 
      required: true 
    },
    markedAt: { 
      type: Date, 
      default: Date.now 
    },
  },
  { timestamps: true }
);

// Index for efficient queries
AttendanceSchema.index({ teacherId: 1, date: 1 });
AttendanceSchema.index({ studentId: 1, date: 1 });
AttendanceSchema.index({ date: 1, status: 1 });
AttendanceSchema.index({ teacherId: 1, studentId: 1, date: 1 }, { unique: true }); // Prevent duplicate entries

export const AttendanceModel: Model<Attendance> =
  mongoose.models.Attendance || mongoose.model<Attendance>('Attendance', AttendanceSchema);
