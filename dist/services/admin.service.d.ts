import { FilterQuery, UpdateQuery } from 'mongoose';
import { Admin } from '../models/Admin.model';
export declare function createAdmin(data: Partial<Admin>): Promise<Admin>;
export declare function listAdmins(filter?: FilterQuery<Admin>): Promise<Admin[]>;
export declare function getAdminById(id: string): Promise<Admin | null>;
export declare function updateAdmin(id: string, updates: UpdateQuery<Admin>): Promise<Admin | null>;
export declare function deleteAdmin(id: string): Promise<Admin | null>;
export declare function getAllTeachersForAdmin(): Promise<(import("mongoose").Document<unknown, {}, import("../models/Teacher.model").Teacher, {}, {}> & import("../models/Teacher.model").Teacher & Required<{
    _id: unknown;
}> & {
    __v: number;
})[]>;
export declare function getAllStudentsForAdmin(): Promise<(import("mongoose").Document<unknown, {}, import("../models/Student.model").Student, {}, {}> & import("../models/Student.model").Student & Required<{
    _id: unknown;
}> & {
    __v: number;
})[]>;
//# sourceMappingURL=admin.service.d.ts.map