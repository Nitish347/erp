import mongoose, { Schema, Document, Model } from 'mongoose';

export interface Subject extends Document {
    name: string;
    code: string;
    description: string;
    classId: string;
    teacherId?: mongoose.Types.ObjectId;
    credits: number;
    category: string;
    syllabus: string[];
    instituteId: mongoose.Types.ObjectId;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const SubjectSchema: Schema<Subject> = new Schema(
    {
        name: { type: String, required: true, trim: true },
        code: { type: String, required: true, trim: true },
        description: { type: String, required: true },
        classId: { type: String, required: true },
        teacherId: { type: Schema.Types.ObjectId, ref: 'Teacher' },
        credits: { type: Number, required: true, default: 1 },
        category: { type: String, required: true },
        syllabus: [{ type: String }],
        instituteId: { type: Schema.Types.ObjectId, ref: 'Institute', required: true },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

// Indexes
SubjectSchema.index({ instituteId: 1, classId: 1 });
SubjectSchema.index({ code: 1, instituteId: 1 }, { unique: true });

export const SubjectModel: Model<Subject> =
    mongoose.models.Subject || mongoose.model<Subject>('Subject', SubjectSchema);
