import mongoose, { Schema, Document, Model } from 'mongoose';

interface HealthParameter {
    name: string;
    value: string;
    status: 'normal' | 'abnormal' | 'critical';
}

const HealthParameterSchema = new Schema<HealthParameter>({
    name: { type: String, required: true },
    value: { type: String, required: true },
    status: { type: String, enum: ['normal', 'abnormal', 'critical'], default: 'normal' },
}, { _id: false });

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

const MedicalRecordSchema: Schema<MedicalRecord> = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
        checkupDate: { type: Date, required: true },
        checkupType: { type: String, required: true },
        parameters: [HealthParameterSchema],
        drName: { type: String, required: true },
        remark: { type: String },
        attachment: [{ type: String }],
        instituteId: { type: Schema.Types.ObjectId, ref: 'Institute', required: true },
    },
    { timestamps: true }
);

// Indexes
MedicalRecordSchema.index({ userId: 1, checkupDate: -1 });
MedicalRecordSchema.index({ instituteId: 1 });

export const MedicalRecordModel: Model<MedicalRecord> =
    mongoose.models.MedicalRecord || mongoose.model<MedicalRecord>('MedicalRecord', MedicalRecordSchema);
