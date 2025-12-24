import { FeeModel, Fee } from '../models/Fee.model';

export async function createFee(data: Partial<Fee>): Promise<Fee> {
    const fee = new FeeModel(data);
    return await fee.save();
}

export async function listFees(filter: any = {}): Promise<Fee[]> {
    return await FeeModel.find(filter)
        .populate('studentId', 'firstName lastName email enrollmentNumber')
        .sort({ dueDate: -1 })
        .exec();
}

export async function getFeeById(id: string): Promise<Fee | null> {
    return await FeeModel.findById(id)
        .populate('studentId', 'firstName lastName email enrollmentNumber')
        .exec();
}

export async function updateFee(id: string, data: Partial<Fee>): Promise<Fee | null> {
    return await FeeModel.findByIdAndUpdate(id, data, { new: true })
        .populate('studentId', 'firstName lastName email enrollmentNumber')
        .exec();
}

export async function deleteFee(id: string): Promise<Fee | null> {
    return await FeeModel.findByIdAndDelete(id).exec();
}

export async function recordPayment(
    id: string,
    paymentData: {
        paidAmount: number;
        paymentMethod: string;
        transactionId?: string;
    }
): Promise<Fee | null> {
    const fee = await FeeModel.findById(id);
    if (!fee) return null;

    const totalPaid = fee.paidAmount + paymentData.paidAmount;
    let status: 'pending' | 'partial' | 'paid' | 'overdue' = 'pending';

    if (totalPaid >= fee.amount) {
        status = 'paid';
    } else if (totalPaid > 0) {
        status = 'partial';
    }

    return await FeeModel.findByIdAndUpdate(
        id,
        {
            paidAmount: totalPaid,
            paidDate: new Date(),
            status,
            paymentMethod: paymentData.paymentMethod,
            transactionId: paymentData.transactionId,
        },
        { new: true }
    )
        .populate('studentId', 'firstName lastName email enrollmentNumber')
        .exec();
}

export async function getFeesByStudent(studentId: string): Promise<Fee[]> {
    return await FeeModel.find({ studentId })
        .sort({ dueDate: -1 })
        .exec();
}

export async function getPendingFees(studentId: string): Promise<Fee[]> {
    return await FeeModel.find({
        studentId,
        status: { $in: ['pending', 'partial', 'overdue'] },
    })
        .sort({ dueDate: 1 })
        .exec();
}

export async function updateOverdueFees(): Promise<void> {
    const now = new Date();
    await FeeModel.updateMany(
        {
            dueDate: { $lt: now },
            status: { $in: ['pending', 'partial'] },
        },
        { status: 'overdue' }
    );
}
