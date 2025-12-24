import mongoose, { Document, Model } from 'mongoose';
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
export declare const FeeModel: Model<Fee>;
//# sourceMappingURL=Fee.model.d.ts.map