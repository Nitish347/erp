import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
export declare function createFeeHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function listFeesHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function getFeeByIdHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function updateFeeHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function recordPaymentHandler(req: AuthRequest, res: Response): Promise<void>;
//# sourceMappingURL=fee.controller.d.ts.map