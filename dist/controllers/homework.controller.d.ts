import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
export declare function createHomeworkHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function listHomeworkHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function getHomeworkByIdHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function updateHomeworkHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function deleteHomeworkHandler(req: AuthRequest, res: Response): Promise<void>;
//# sourceMappingURL=homework.controller.d.ts.map