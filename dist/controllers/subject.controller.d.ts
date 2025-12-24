import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
export declare function createSubjectHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function listSubjectsHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function getSubjectByIdHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function updateSubjectHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function deleteSubjectHandler(req: AuthRequest, res: Response): Promise<void>;
//# sourceMappingURL=subject.controller.d.ts.map