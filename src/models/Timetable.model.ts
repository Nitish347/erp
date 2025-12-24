import mongoose, { Schema, Document, Model } from 'mongoose';

export interface Timetable extends Document {
  teacherId: mongoose.Types.ObjectId;
  studentId?: mongoose.Types.ObjectId; // Optional for teacher-only timetables
  subject: string;
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  startTime: string; // Format: "HH:MM" (24-hour format)
  endTime: string; // Format: "HH:MM" (24-hour format)
  room?: string;
  class?: string;
  section?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TimetableSchema: Schema<Timetable> = new Schema(
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
    subject: { 
      type: String, 
      required: true, 
      trim: true 
    },
    dayOfWeek: { 
      type: String, 
      required: true, 
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] 
    },
    startTime: { 
      type: String, 
      required: true,
      match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/ // HH:MM format validation
    },
    endTime: { 
      type: String, 
      required: true,
      match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/ // HH:MM format validation
    },
    room: { 
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
    isActive: { 
      type: Boolean, 
      default: true 
    },
  },
  { timestamps: true }
);

// Index for efficient queries
TimetableSchema.index({ teacherId: 1, dayOfWeek: 1 });
TimetableSchema.index({ studentId: 1, dayOfWeek: 1 });
TimetableSchema.index({ dayOfWeek: 1, startTime: 1 });

export const TimetableModel: Model<Timetable> =
  mongoose.models.Timetable || mongoose.model<Timetable>('Timetable', TimetableSchema);
