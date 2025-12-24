import mongoose, { Schema, Document, Model } from 'mongoose';

export interface Class extends Document {
    name: string;
    grade: string;
    sections: string[];
    teacherId?: mongoose.Types.ObjectId;
    maxStudents: number;
    subjects: string[];
    instituteId: mongoose.Types.ObjectId;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const ClassSchema: Schema<Class> = new Schema(
    {
        name: { type: String, required: true, trim: true },
        grade: { type: String, required: true },
        sections: [{ type: String }],
        teacherId: { type: Schema.Types.ObjectId, ref: 'Teacher' },
        maxStudents: { type: Number, default: 40 },
        subjects: [{ type: String }],
        instituteId: { type: Schema.Types.ObjectId, ref: 'Institute', required: true },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

// Indexes
ClassSchema.index({ instituteId: 1, grade: 1 });
ClassSchema.index({ name: 1, instituteId: 1 });

export const ClassModel: Model<Class> =
    mongoose.models.Class || mongoose.model<Class>('Class', ClassSchema);
