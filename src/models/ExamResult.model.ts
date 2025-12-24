import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ExamResult extends Document {
    studentId: mongoose.Types.ObjectId;
    examId: mongoose.Types.ObjectId;
    subject: string;
    marks: number;
    totalMarks: number;
    grade?: string;
    remarks?: string;
    status: 'pending' | 'submitted' | 'graded';
    isPresent: boolean;
    teacherRemarks?: string;
    createdAt: Date;
    updatedAt: Date;
}

const ExamResultSchema: Schema<ExamResult> = new Schema(
    {
        studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
        examId: { type: Schema.Types.ObjectId, ref: 'Exam', required: true },
        subject: { type: String, required: true },
        marks: { type: Number, required: true, default: 0 },
        totalMarks: { type: Number, required: true },
        grade: { type: String },
        remarks: { type: String },
        status: { type: String, enum: ['pending', 'submitted', 'graded'], default: 'pending' },
        isPresent: { type: Boolean, default: true },
        teacherRemarks: { type: String },
    },
    { timestamps: true }
);

// Indexes
ExamResultSchema.index({ studentId: 1, examId: 1 }, { unique: true });
ExamResultSchema.index({ examId: 1, status: 1 });
ExamResultSchema.index({ studentId: 1 });

export const ExamResultModel: Model<ExamResult> =
    mongoose.models.ExamResult || mongoose.model<ExamResult>('ExamResult', ExamResultSchema);
