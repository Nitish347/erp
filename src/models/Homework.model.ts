import mongoose, { Schema, Document, Model } from 'mongoose';

export interface Homework extends Document {
    title: string;
    description: string;
    subject: string;
    teacherId: mongoose.Types.ObjectId;
    classId: string;
    section: string;
    assignedStudents: string[];
    dueDate: Date;
    attachments: string[];
    priority: 'low' | 'medium' | 'high';
    totalMarks?: number;
    instituteId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const HomeworkSchema: Schema<Homework> = new Schema(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true },
        subject: { type: String, required: true },
        teacherId: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
        classId: { type: String, required: true },
        section: { type: String, required: true },
        assignedStudents: [{ type: String }],
        dueDate: { type: Date, required: true },
        attachments: [{ type: String }],
        priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
        totalMarks: { type: Number },
        instituteId: { type: Schema.Types.ObjectId, ref: 'Institute', required: true },
    },
    { timestamps: true }
);

// Indexes for better query performance
HomeworkSchema.index({ teacherId: 1, dueDate: -1 });
HomeworkSchema.index({ classId: 1, section: 1 });
HomeworkSchema.index({ instituteId: 1 });

export const HomeworkModel: Model<Homework> =
    mongoose.models.Homework || mongoose.model<Homework>('Homework', HomeworkSchema);
