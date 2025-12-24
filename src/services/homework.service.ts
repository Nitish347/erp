import { HomeworkModel, Homework } from '../models/Homework.model';

export async function createHomework(data: Partial<Homework>): Promise<Homework> {
    const homework = new HomeworkModel(data);
    return await homework.save();
}

export async function listHomework(filter: any = {}): Promise<Homework[]> {
    return await HomeworkModel.find(filter)
        .populate('teacherId', 'firstName lastName email')
        .sort({ dueDate: -1 })
        .exec();
}

export async function getHomeworkById(id: string): Promise<Homework | null> {
    return await HomeworkModel.findById(id)
        .populate('teacherId', 'firstName lastName email')
        .exec();
}

export async function updateHomework(id: string, data: Partial<Homework>): Promise<Homework | null> {
    return await HomeworkModel.findByIdAndUpdate(id, data, { new: true })
        .populate('teacherId', 'firstName lastName email')
        .exec();
}

export async function deleteHomework(id: string): Promise<Homework | null> {
    return await HomeworkModel.findByIdAndDelete(id).exec();
}

export async function getHomeworkByClass(classId: string, section: string): Promise<Homework[]> {
    return await HomeworkModel.find({ classId, section })
        .populate('teacherId', 'firstName lastName email')
        .sort({ dueDate: -1 })
        .exec();
}

export async function getHomeworkByTeacher(teacherId: string): Promise<Homework[]> {
    return await HomeworkModel.find({ teacherId })
        .sort({ dueDate: -1 })
        .exec();
}
