import { Homework } from '../models/Homework.model';
export declare function createHomework(data: Partial<Homework>): Promise<Homework>;
export declare function listHomework(filter?: any): Promise<Homework[]>;
export declare function getHomeworkById(id: string): Promise<Homework | null>;
export declare function updateHomework(id: string, data: Partial<Homework>): Promise<Homework | null>;
export declare function deleteHomework(id: string): Promise<Homework | null>;
export declare function getHomeworkByClass(classId: string, section: string): Promise<Homework[]>;
export declare function getHomeworkByTeacher(teacherId: string): Promise<Homework[]>;
//# sourceMappingURL=homework.service.d.ts.map