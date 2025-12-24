import { FilterQuery, UpdateQuery } from 'mongoose';
import { Student } from '../models/Student.model';
export declare function createStudent(data: Partial<Student>): Promise<Student>;
export declare function listStudents(filter?: FilterQuery<Student>): Promise<Student[]>;
export declare function getStudentById(id: string): Promise<Student | null>;
export declare function updateStudent(id: string, updates: UpdateQuery<Student>): Promise<Student | null>;
export declare function deleteStudent(id: string): Promise<Student | null>;
//# sourceMappingURL=student.service.d.ts.map