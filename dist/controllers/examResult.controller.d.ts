import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
export declare function createResultHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function listResultsHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function getResultByIdHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function updateResultHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function deleteResultHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function getStudentResultsHandler(req: AuthRequest, res: Response): Promise<void>;
//# sourceMappingURL=examResult.controller.d.ts.map