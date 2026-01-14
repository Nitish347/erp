import { FilterQuery, UpdateQuery } from 'mongoose';
import { ITeacher } from '../models/Teacher.model';
export declare function createTeacher(data: Partial<ITeacher>): Promise<ITeacher>;
export declare function listTeachers(filter?: FilterQuery<ITeacher>): Promise<ITeacher[]>;
export declare function getTeacherById(id: string): Promise<ITeacher | null>;
export declare function updateTeacher(id: string, updates: UpdateQuery<ITeacher>): Promise<ITeacher | null>;
export declare function deleteTeacher(id: string): Promise<ITeacher | null>;
export declare function createStudentByTeacher(teacherId: string, data: any): Promise<import("mongoose").Document<unknown, {}, import("../models/Student.model").Student, {}, {}> & import("../models/Student.model").Student & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export declare function listStudentsByTeacher(teacherId: string): Promise<(import("mongoose").Document<unknown, {}, import("../models/Student.model").Student, {}, {}> & import("../models/Student.model").Student & Required<{
    _id: unknown;
}> & {
    __v: number;
})[]>;
export declare function getStudentByTeacher(teacherId: string, studentId: string): Promise<(import("mongoose").Document<unknown, {}, import("../models/Student.model").Student, {}, {}> & import("../models/Student.model").Student & Required<{
    _id: unknown;
}> & {
    __v: number;
}) | null>;
export declare function updateStudentByTeacher(teacherId: string, studentId: string, data: any): Promise<(import("mongoose").Document<unknown, {}, import("../models/Student.model").Student, {}, {}> & import("../models/Student.model").Student & Required<{
    _id: unknown;
}> & {
    __v: number;
}) | null>;
export declare function deleteStudentByTeacher(teacherId: string, studentId: string): Promise<(import("mongoose").Document<unknown, {}, import("../models/Student.model").Student, {}, {}> & import("../models/Student.model").Student & Required<{
    _id: unknown;
}> & {
    __v: number;
}) | null>;
//# sourceMappingURL=teacher.service.d.ts.map