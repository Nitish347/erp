import { ExamResultModel, ExamResult } from '../models/ExamResult.model';

export async function createResult(data: Partial<ExamResult>): Promise<ExamResult> {
    const result = new ExamResultModel(data);
    return await result.save();
}

export async function listResults(filter: any = {}): Promise<ExamResult[]> {
    return await ExamResultModel.find(filter)
        .populate('examId', 'name type subject examDate totalMarks')
        .populate('studentId', 'firstName lastName email enrollmentNumber')
        .sort({ createdAt: -1 })
        .exec();
}

export async function getResultById(id: string): Promise<ExamResult | null> {
    return await ExamResultModel.findById(id)
        .populate('examId', 'name type subject examDate totalMarks')
        .populate('studentId', 'firstName lastName email enrollmentNumber')
        .exec();
}

export async function updateResult(id: string, data: Partial<ExamResult>): Promise<ExamResult | null> {
    return await ExamResultModel.findByIdAndUpdate(id, data, { new: true })
        .populate('examId', 'name type subject examDate totalMarks')
        .populate('studentId', 'firstName lastName email enrollmentNumber')
        .exec();
}

export async function deleteResult(id: string): Promise<ExamResult | null> {
    return await ExamResultModel.findByIdAndDelete(id).exec();
}

export async function getStudentResults(studentId: string): Promise<ExamResult[]> {
    return await ExamResultModel.find({ studentId })
        .populate('examId', 'name type subject examDate totalMarks')
        .sort({ createdAt: -1 })
        .exec();
}

export async function getResultsByExam(examId: string): Promise<ExamResult[]> {
    return await ExamResultModel.find({ examId })
        .populate('studentId', 'firstName lastName email enrollmentNumber')
        .sort({ marks: -1 })
        .exec();
}

export async function getResultByExamAndStudent(
    examId: string,
    studentId: string
): Promise<ExamResult | null> {
    return await ExamResultModel.findOne({ examId, studentId })
        .populate('examId', 'name type subject examDate totalMarks')
        .exec();
}
