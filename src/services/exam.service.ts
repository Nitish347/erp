import { ExamModel, Exam } from '../models/Exam.model';

export async function createExam(data: Partial<Exam>): Promise<Exam> {
    const exam = new ExamModel(data);
    return await exam.save();
}

export async function listExams(filter: any = {}): Promise<Exam[]> {
    return await ExamModel.find(filter)
        .populate('teacherId', 'firstName lastName email')
        .sort({ examDate: -1 })
        .exec();
}

export async function getExamById(id: string): Promise<Exam | null> {
    return await ExamModel.findById(id)
        .populate('teacherId', 'firstName lastName email')
        .exec();
}

export async function updateExam(id: string, data: Partial<Exam>): Promise<Exam | null> {
    return await ExamModel.findByIdAndUpdate(id, data, { new: true })
        .populate('teacherId', 'firstName lastName email')
        .exec();
}

export async function deleteExam(id: string): Promise<Exam | null> {
    return await ExamModel.findByIdAndDelete(id).exec();
}

export async function getExamsByClass(classId: string, section: string): Promise<Exam[]> {
    return await ExamModel.find({ classId, section, isActive: true })
        .populate('teacherId', 'firstName lastName email')
        .sort({ examDate: -1 })
        .exec();
}

export async function getExamsByTeacher(teacherId: string): Promise<Exam[]> {
    return await ExamModel.find({ teacherId })
        .sort({ examDate: -1 })
        .exec();
}

export async function getUpcomingExams(classId: string, section: string): Promise<Exam[]> {
    const now = new Date();
    return await ExamModel.find({
        classId,
        section,
        examDate: { $gte: now },
        isActive: true,
    })
        .populate('teacherId', 'firstName lastName email')
        .sort({ examDate: 1 })
        .exec();
}
