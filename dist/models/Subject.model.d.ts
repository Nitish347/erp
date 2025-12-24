import mongoose, { Document, Model } from 'mongoose';
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
export declare const SubjectModel: Model<Subject>;
//# sourceMappingURL=Subject.model.d.ts.map