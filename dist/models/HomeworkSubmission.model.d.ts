import mongoose, { Document, Model } from 'mongoose';
export interface HomeworkSubmission extends Document {
    homeworkId: mongoose.Types.ObjectId;
    studentId: mongoose.Types.ObjectId;
    status: 'pending' | 'submitted' | 'graded';
    submittedAt?: Date;
    submissionContent?: string;
    attachments: string[];
    marksObtained?: number;
    feedback?: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const HomeworkSubmissionModel: Model<HomeworkSubmission>;
//# sourceMappingURL=HomeworkSubmission.model.d.ts.map