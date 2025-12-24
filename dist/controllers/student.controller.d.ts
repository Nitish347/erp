import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
export declare function createStudentHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function listStudentsHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function getStudentByIdHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function updateStudentHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function deleteStudentHandler(req: AuthRequest, res: Response): Promise<void>;
//# sourceMappingURL=student.controller.d.ts.map