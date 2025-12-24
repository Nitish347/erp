import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
export declare function createExamHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function listExamsHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function getExamByIdHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function updateExamHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function deleteExamHandler(req: AuthRequest, res: Response): Promise<void>;
//# sourceMappingURL=exam.controller.d.ts.map