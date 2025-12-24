import mongoose, { Schema, Document, Model } from 'mongoose';

export interface Exam extends Document {
    name: string;
    type: 'quiz' | 'mid-term' | 'final' | 'assignment';
    subject: string;
    classId: string;
    section: string;
    teacherId: mongoose.Types.ObjectId;
    totalMarks: number;
    durationMinutes?: number;
    examDate: Date;
    instructions?: string;
    syllabus?: string;
    instituteId: mongoose.Types.ObjectId;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const ExamSchema: Schema<Exam> = new Schema(
    {
        name: { type: String, required: true, trim: true },
        type: { type: String, enum: ['quiz', 'mid-term', 'final', 'assignment'], required: true },
        subject: { type: String, required: true },
        classId: { type: String, required: true },
        section: { type: String, required: true },
        teacherId: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
        totalMarks: { type: Number, required: true },
        durationMinutes: { type: Number },
        examDate: { type: Date, required: true },
        instructions: { type: String },
        syllabus: { type: String },
        instituteId: { type: Schema.Types.ObjectId, ref: 'Institute', required: true },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

// Indexes
ExamSchema.index({ classId: 1, examDate: -1 });
ExamSchema.index({ teacherId: 1, examDate: -1 });
ExamSchema.index({ instituteId: 1, examDate: -1 });

export const ExamModel: Model<Exam> =
    mongoose.models.Exam || mongoose.model<Exam>('Exam', ExamSchema);
