import mongoose, { Schema, Document, Model } from 'mongoose';

export interface Lunch extends Document {
  teacherId: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
  date: Date;
  status: 'Full Meal' | 'Half Meal' | 'Not Taken' | 'Absent';
  class: string;
  section: string;
  remarks?: string;
  markedBy: mongoose.Types.ObjectId; // Who marked the lunch record
  markedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const LunchSchema: Schema<Lunch> = new Schema(
  {
    teacherId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Teacher', 
      required: true 
    },
    studentId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Student',
      required: true
    },
    date: { 
      type: Date, 
      required: true,
      default: Date.now
    },
    status: { 
      type: String, 
      required: true, 
      enum: ['Full Meal', 'Half Meal', 'Not Taken', 'Absent'] 
    },
    class: { 
      type: String, 
      required: true,
      trim: true 
    },
    section: { 
      type: String, 
      required: true,
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
LunchSchema.index({ teacherId: 1, date: 1 });
LunchSchema.index({ studentId: 1, date: 1 });
LunchSchema.index({ date: 1, status: 1 });
LunchSchema.index({ class: 1, section: 1, date: 1 });
LunchSchema.index({ studentId: 1, date: 1 }, { unique: true }); // Prevent duplicate entries for same student on same day

export const LunchModel: Model<Lunch> =
  mongoose.models.Lunch || mongoose.model<Lunch>('Lunch', LunchSchema);
