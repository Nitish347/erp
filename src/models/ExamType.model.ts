import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ExamType extends Document {
    name: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    instituteId: mongoose.Types.ObjectId;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const ExamTypeSchema: Schema<ExamType> = new Schema(
    {
        name: { type: String, required: true, trim: true },
        description: { type: String, trim: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        instituteId: { type: Schema.Types.ObjectId, ref: 'Admin', required: true },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

// Indexes
ExamTypeSchema.index({ instituteId: 1, startDate: -1 });
ExamTypeSchema.index({ isActive: 1 });

export const ExamTypeModel: Model<ExamType> =
    mongoose.models.ExamType || mongoose.model<ExamType>('ExamType', ExamTypeSchema);
