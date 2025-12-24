import mongoose, { Document, Model } from 'mongoose';
export interface Timetable extends Document {
    teacherId: mongoose.Types.ObjectId;
    studentId?: mongoose.Types.ObjectId;
    subject: string;
    dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
    startTime: string;
    endTime: string;
    room?: string;
    class?: string;
    section?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare const TimetableModel: Model<Timetable>;
//# sourceMappingURL=Timetable.model.d.ts.map