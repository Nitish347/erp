import mongoose, { Document, Model } from 'mongoose';
interface HealthParameter {
    name: string;
    value: string;
    status: 'normal' | 'abnormal' | 'critical';
}
export interface MedicalRecord extends Document {
    userId: mongoose.Types.ObjectId;
    checkupDate: Date;
    checkupType: string;
    parameters: HealthParameter[];
    drName: string;
    remark?: string;
    attachment: string[];
    instituteId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
export declare const MedicalRecordModel: Model<MedicalRecord>;
export {};
//# sourceMappingURL=MedicalRecord.model.d.ts.map