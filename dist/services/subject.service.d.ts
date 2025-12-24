import { Subject } from '../models/Subject.model';
export declare function createSubject(data: Partial<Subject>): Promise<Subject>;
export declare function listSubjects(filter?: any): Promise<Subject[]>;
export declare function getSubjectById(id: string): Promise<Subject | null>;
export declare function updateSubject(id: string, data: Partial<Subject>): Promise<Subject | null>;
export declare function deleteSubject(id: string): Promise<Subject | null>;
export declare function getSubjectsByClass(classId: string): Promise<Subject[]>;
export declare function getSubjectsByTeacher(teacherId: string): Promise<Subject[]>;
//# sourceMappingURL=subject.service.d.ts.map