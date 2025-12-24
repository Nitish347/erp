import mongoose, { Schema, Document, Model } from 'mongoose';

export interface Notice extends Document {
    title: string;
    description: string;
    issuedBy: mongoose.Types.ObjectId; // Teacher or Admin ID
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

const NoticeSchema: Schema<Notice> = new Schema(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true },
        issuedBy: { type: Schema.Types.ObjectId, required: true },
        issuedByRole: { type: String, enum: ['admin', 'teacher'], required: true },
        targetedClassId: [{ type: String }],
        targetSections: [{ type: String }],
        issuedDate: { type: Date, required: true, default: Date.now },
        expiryDate: { type: Date },
        priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
        attachment: [{ type: String }],
        instituteId: { type: Schema.Types.ObjectId, ref: 'Institute', required: true },
    },
    { timestamps: true }
);

// Indexes
NoticeSchema.index({ instituteId: 1, issuedDate: -1 });
NoticeSchema.index({ expiryDate: 1 });
NoticeSchema.index({ targetedClassId: 1 });

export const NoticeModel: Model<Notice> =
    mongoose.models.Notice || mongoose.model<Notice>('Notice', NoticeSchema);
