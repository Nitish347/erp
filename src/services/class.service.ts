import { ClassModel, Class } from '../models/Class.model';

export async function createClass(data: Partial<Class>): Promise<Class> {
    const classData = new ClassModel(data);
    return await classData.save();
}

export async function listClasses(filter: any = {}): Promise<Class[]> {
    return await ClassModel.find(filter)
        .populate('teacherId', 'firstName lastName email')
        .sort({ grade: 1, name: 1 })
        .exec();
}

export async function getClassById(id: string): Promise<Class | null> {
    return await ClassModel.findById(id)
        .populate('teacherId', 'firstName lastName email')
        .exec();
}

export async function updateClass(id: string, data: Partial<Class>): Promise<Class | null> {
    return await ClassModel.findByIdAndUpdate(id, data, { new: true })
        .populate('teacherId', 'firstName lastName email')
        .exec();
}

export async function deleteClass(id: string): Promise<Class | null> {
    return await ClassModel.findByIdAndDelete(id).exec();
}




export async function getClassesByGrade(grade: string): Promise<Class[]> {
    return await ClassModel.find({ grade, isActive: true })
        .populate('teacherId', 'firstName lastName email')
        .sort({ name: 1 })
        .exec();
}

export async function addSection(id: string, section: string): Promise<Class | null> {
    return await ClassModel.findByIdAndUpdate(
        id,
        { $addToSet: { sections: section } },
        { new: true }
    ).exec();
}
