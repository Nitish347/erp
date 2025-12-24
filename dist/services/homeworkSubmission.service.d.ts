import { HomeworkSubmission } from '../models/HomeworkSubmission.model';
export declare function createSubmission(data: Partial<HomeworkSubmission>): Promise<HomeworkSubmission>;
export declare function listSubmissions(filter?: any): Promise<HomeworkSubmission[]>;
export declare function getSubmissionById(id: string): Promise<HomeworkSubmission | null>;
export declare function updateSubmission(id: string, data: Partial<HomeworkSubmission>): Promise<HomeworkSubmission | null>;
export declare function gradeSubmission(id: string, marksObtained: number, feedback?: string): Promise<HomeworkSubmission | null>;
export declare function getSubmissionByHomeworkAndStudent(homeworkId: string, studentId: string): Promise<HomeworkSubmission | null>;
export declare function getSubmissionsByHomework(homeworkId: string): Promise<HomeworkSubmission[]>;
export declare function getSubmissionsByStudent(studentId: string): Promise<HomeworkSubmission[]>;
//# sourceMappingURL=homeworkSubmission.service.d.ts.map