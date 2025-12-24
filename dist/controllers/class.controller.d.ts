import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
export declare function createClassHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function listClassesHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function getClassByIdHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function updateClassHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function deleteClassHandler(req: AuthRequest, res: Response): Promise<void>;
//# sourceMappingURL=class.controller.d.ts.map