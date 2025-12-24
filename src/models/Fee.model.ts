import mongoose, { Schema, Document, Model } from 'mongoose';

export interface Fee extends Document {
    studentId: mongoose.Types.ObjectId;
    instituteId: mongoose.Types.ObjectId;
    feeType: string;
    amount: number;
    dueDate: Date;
    paidAmount: number;
    paidDate?: Date;
    status: 'pending' | 'partial' | 'paid' | 'overdue';
    paymentMethod?: string;
    transactionId?: string;
    remarks?: string;
    createdAt: Date;
    updatedAt: Date;
}

const FeeSchema: Schema<Fee> = new Schema(
    {
        studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
        instituteId: { type: Schema.Types.ObjectId, ref: 'Institute', required: true },
        feeType: { type: String, required: true },
        amount: { type: Number, required: true },
        dueDate: { type: Date, required: true },
        paidAmount: { type: Number, default: 0 },
        paidDate: { type: Date },
        status: { type: String, enum: ['pending', 'partial', 'paid', 'overdue'], default: 'pending' },
        paymentMethod: { type: String },
        transactionId: { type: String },
        remarks: { type: String },
    },
    { timestamps: true }
);

// Indexes
FeeSchema.index({ studentId: 1, status: 1 });
FeeSchema.index({ instituteId: 1, dueDate: -1 });
FeeSchema.index({ status: 1, dueDate: 1 });

export const FeeModel: Model<Fee> =
    mongoose.models.Fee || mongoose.model<Fee>('Fee', FeeSchema);
