import { SubjectModel, Subject } from '../models/Subject.model';

export async function createSubject(data: Partial<Subject>): Promise<Subject> {
    const subject = new SubjectModel(data);
    return await subject.save();
}

export async function listSubjects(filter: any = {}): Promise<Subject[]> {
    return await SubjectModel.find(filter)
        .populate('teacherId', 'firstName lastName email')
        .sort({ name: 1 })
        .exec();
}

export async function getSubjectById(id: string): Promise<Subject | null> {
    return await SubjectModel.findById(id)
        .populate('teacherId', 'firstName lastName email')
        .exec();
}

export async function updateSubject(id: string, data: Partial<Subject>): Promise<Subject | null> {
    return await SubjectModel.findByIdAndUpdate(id, data, { new: true })
        .populate('teacherId', 'firstName lastName email')
        .exec();
}

export async function deleteSubject(id: string): Promise<Subject | null> {
    return await SubjectModel.findByIdAndDelete(id).exec();
}

export async function getSubjectsByClass(classId: string): Promise<Subject[]> {
    return await SubjectModel.find({ classId, isActive: true })
        .populate('teacherId', 'firstName lastName email')
        .sort({ name: 1 })
        .exec();
}

export async function getSubjectsByTeacher(teacherId: string): Promise<Subject[]> {
    return await SubjectModel.find({ teacherId, isActive: true })
        .sort({ name: 1 })
        .exec();
}


