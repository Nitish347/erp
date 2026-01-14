import mongoose, { Document, Model } from 'mongoose';
export interface Exam extends Document {
    examTypeId: mongoose.Types.ObjectId;
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
export declare const ExamModel: Model<Exam>;
//# sourceMappingURL=Exam.model.d.ts.map