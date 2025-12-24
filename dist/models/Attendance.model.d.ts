import mongoose, { Document, Model } from 'mongoose';
export interface Attendance extends Document {
    teacherId: mongoose.Types.ObjectId;
    studentId?: mongoose.Types.ObjectId;
    date: Date;
    status: 'Present' | 'Absent' | 'Late' | 'Excused';
    subject?: string;
    class?: string;
    section?: string;
    remarks?: string;
    markedBy: mongoose.Types.ObjectId;
    markedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare const AttendanceModel: Model<Attendance>;
//# sourceMappingURL=Attendance.model.d.ts.map