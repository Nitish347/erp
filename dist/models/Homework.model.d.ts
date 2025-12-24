import mongoose, { Document, Model } from 'mongoose';
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
export declare const HomeworkModel: Model<Homework>;
//# sourceMappingURL=Homework.model.d.ts.map