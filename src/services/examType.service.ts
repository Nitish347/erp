import { ExamTypeModel } from '../models/ExamType.model';

export async function createExamType(data: any) {
    const examType = new ExamTypeModel(data);
    return await examType.save();
}

export async function listExamTypes(filter: any = {}) {
    return await ExamTypeModel.find(filter).sort({ startDate: -1 });
}

export async function getExamTypeById(id: string) {
    return await ExamTypeModel.findById(id);
}

export async function updateExamType(id: string, data: any) {
    return await ExamTypeModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

export async function deleteExamType(id: string) {
    return await ExamTypeModel.findByIdAndDelete(id);
}
