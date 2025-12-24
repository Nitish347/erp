import { Exam } from '../models/Exam.model';
export declare function createExam(data: Partial<Exam>): Promise<Exam>;
export declare function listExams(filter?: any): Promise<Exam[]>;
export declare function getExamById(id: string): Promise<Exam | null>;
export declare function updateExam(id: string, data: Partial<Exam>): Promise<Exam | null>;
export declare function deleteExam(id: string): Promise<Exam | null>;
export declare function getExamsByClass(classId: string, section: string): Promise<Exam[]>;
export declare function getExamsByTeacher(teacherId: string): Promise<Exam[]>;
export declare function getUpcomingExams(classId: string, section: string): Promise<Exam[]>;
//# sourceMappingURL=exam.service.d.ts.map