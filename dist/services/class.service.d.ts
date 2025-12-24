import { Class } from '../models/Class.model';
export declare function createClass(data: Partial<Class>): Promise<Class>;
export declare function listClasses(filter?: any): Promise<Class[]>;
export declare function getClassById(id: string): Promise<Class | null>;
export declare function updateClass(id: string, data: Partial<Class>): Promise<Class | null>;
export declare function deleteClass(id: string): Promise<Class | null>;
export declare function getClassesByGrade(grade: string): Promise<Class[]>;
//# sourceMappingURL=class.service.d.ts.map