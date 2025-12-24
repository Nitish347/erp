import { ExamResult } from '../models/ExamResult.model';
export declare function createResult(data: Partial<ExamResult>): Promise<ExamResult>;
export declare function listResults(filter?: any): Promise<ExamResult[]>;
export declare function getResultById(id: string): Promise<ExamResult | null>;
export declare function updateResult(id: string, data: Partial<ExamResult>): Promise<ExamResult | null>;
export declare function deleteResult(id: string): Promise<ExamResult | null>;
export declare function getStudentResults(studentId: string): Promise<ExamResult[]>;
export declare function getResultsByExam(examId: string): Promise<ExamResult[]>;
export declare function getResultByExamAndStudent(examId: string, studentId: string): Promise<ExamResult | null>;
//# sourceMappingURL=examResult.service.d.ts.map