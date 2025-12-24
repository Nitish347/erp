import mongoose, { Schema, Document, Model } from 'mongoose';

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

const HomeworkSubmissionSchema: Schema<HomeworkSubmission> = new Schema(
    {
        homeworkId: { type: Schema.Types.ObjectId, ref: 'Homework', required: true },
        studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
        status: { type: String, enum: ['pending', 'submitted', 'graded'], default: 'pending' },
        submittedAt: { type: Date },
        submissionContent: { type: String },
        attachments: [{ type: String }],
        marksObtained: { type: Number },
        feedback: { type: String },
    },
    { timestamps: true }
);

// Indexes
HomeworkSubmissionSchema.index({ homeworkId: 1, studentId: 1 }, { unique: true });
HomeworkSubmissionSchema.index({ studentId: 1, status: 1 });
HomeworkSubmissionSchema.index({ homeworkId: 1, status: 1 });

export const HomeworkSubmissionModel: Model<HomeworkSubmission> =
    mongoose.models.HomeworkSubmission || mongoose.model<HomeworkSubmission>('HomeworkSubmission', HomeworkSubmissionSchema);
