import { HomeworkSubmissionModel, HomeworkSubmission } from '../models/HomeworkSubmission.model';

export async function createSubmission(data: Partial<HomeworkSubmission>): Promise<HomeworkSubmission> {
    const submission = new HomeworkSubmissionModel(data);
    return await submission.save();
}

export async function listSubmissions(filter: any = {}): Promise<HomeworkSubmission[]> {
    return await HomeworkSubmissionModel.find(filter)
        .populate('homeworkId', 'title subject dueDate')
        .populate('studentId', 'firstName lastName email enrollmentNumber')
        .sort({ createdAt: -1 })
        .exec();
}

export async function getSubmissionById(id: string): Promise<HomeworkSubmission | null> {
    return await HomeworkSubmissionModel.findById(id)
        .populate('homeworkId', 'title subject dueDate totalMarks')
        .populate('studentId', 'firstName lastName email enrollmentNumber')
        .exec();
}

export async function updateSubmission(id: string, data: Partial<HomeworkSubmission>): Promise<HomeworkSubmission | null> {
    return await HomeworkSubmissionModel.findByIdAndUpdate(id, data, { new: true })
        .populate('homeworkId', 'title subject dueDate')
        .populate('studentId', 'firstName lastName email enrollmentNumber')
        .exec();
}

export async function gradeSubmission(id: string, marksObtained: number, feedback?: string): Promise<HomeworkSubmission | null> {
    return await HomeworkSubmissionModel.findByIdAndUpdate(
        id,
        { marksObtained, feedback, status: 'graded' },
        { new: true }
    )
        .populate('homeworkId', 'title subject dueDate')
        .populate('studentId', 'firstName lastName email enrollmentNumber')
        .exec();
}

export async function getSubmissionByHomeworkAndStudent(
    homeworkId: string,
    studentId: string
): Promise<HomeworkSubmission | null> {
    return await HomeworkSubmissionModel.findOne({ homeworkId, studentId })
        .populate('homeworkId', 'title subject dueDate totalMarks')
        .exec();
}

export async function getSubmissionsByHomework(homeworkId: string): Promise<HomeworkSubmission[]> {
    return await HomeworkSubmissionModel.find({ homeworkId })
        .populate('studentId', 'firstName lastName email enrollmentNumber')
        .sort({ submittedAt: -1 })
        .exec();
}

export async function getSubmissionsByStudent(studentId: string): Promise<HomeworkSubmission[]> {
    return await HomeworkSubmissionModel.find({ studentId })
        .populate('homeworkId', 'title subject dueDate totalMarks')
        .sort({ createdAt: -1 })
        .exec();
}
