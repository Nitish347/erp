import mongoose, { Document, Model } from 'mongoose';
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
export declare const ExamTypeModel: Model<ExamType>;
//# sourceMappingURL=ExamType.model.d.ts.map