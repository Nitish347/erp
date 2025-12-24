import mongoose, { Document, Model } from 'mongoose';
export interface Notice extends Document {
    title: string;
    description: string;
    issuedBy: mongoose.Types.ObjectId;
    issuedByRole: 'admin' | 'teacher';
    targetedClassId?: string[];
    targetSections?: string[];
    issuedDate: Date;
    expiryDate?: Date;
    priority: 'low' | 'medium' | 'high';
    attachment?: string[];
    instituteId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
export declare const NoticeModel: Model<Notice>;
//# sourceMappingURL=Notice.model.d.ts.map