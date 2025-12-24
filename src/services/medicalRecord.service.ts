import { MedicalRecordModel, MedicalRecord } from '../models/MedicalRecord.model';

export async function createRecord(data: Partial<MedicalRecord>): Promise<MedicalRecord> {
    const record = new MedicalRecordModel(data);
    return await record.save();
}

export async function listRecords(filter: any = {}): Promise<MedicalRecord[]> {
    return await MedicalRecordModel.find(filter)
        .populate('userId', 'firstName lastName email enrollmentNumber')
        .sort({ checkupDate: -1 })
        .exec();
}

export async function getRecordById(id: string): Promise<MedicalRecord | null> {
    return await MedicalRecordModel.findById(id)
        .populate('userId', 'firstName lastName email enrollmentNumber')
        .exec();
}

export async function updateRecord(id: string, data: Partial<MedicalRecord>): Promise<MedicalRecord | null> {
    return await MedicalRecordModel.findByIdAndUpdate(id, data, { new: true })
        .populate('userId', 'firstName lastName email enrollmentNumber')
        .exec();
}

export async function deleteRecord(id: string): Promise<MedicalRecord | null> {
    return await MedicalRecordModel.findByIdAndDelete(id).exec();
}

export async function getRecordsByStudent(userId: string): Promise<MedicalRecord[]> {
    return await MedicalRecordModel.find({ userId })
        .sort({ checkupDate: -1 })
        .exec();
}

export async function getRecordsByDateRange(
    userId: string,
    startDate: Date,
    endDate: Date
): Promise<MedicalRecord[]> {
    return await MedicalRecordModel.find({
        userId,
        checkupDate: { $gte: startDate, $lte: endDate },
    })
        .sort({ checkupDate: -1 })
        .exec();
}
