import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
export declare function createTeacherHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function listTeachersHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function getTeacherByIdHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function updateTeacherHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function deleteTeacherHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function listStudentsByTeacherHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function getStudentByTeacherHandler(req: AuthRequest, res: Response): Promise<void>;
//# sourceMappingURL=teacher.controller.d.ts.map