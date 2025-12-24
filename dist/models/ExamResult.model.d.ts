import mongoose, { Document, Model } from 'mongoose';
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
export declare const ExamResultModel: Model<ExamResult>;
//# sourceMappingURL=ExamResult.model.d.ts.map