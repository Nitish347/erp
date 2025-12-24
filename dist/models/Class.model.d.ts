import mongoose, { Document, Model } from 'mongoose';
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
export declare const ClassModel: Model<Class>;
//# sourceMappingURL=Class.model.d.ts.map