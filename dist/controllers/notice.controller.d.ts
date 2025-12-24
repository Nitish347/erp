import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
export declare function createNoticeHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function listNoticesHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function getNoticeByIdHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function updateNoticeHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function deleteNoticeHandler(req: AuthRequest, res: Response): Promise<void>;
//# sourceMappingURL=notice.controller.d.ts.map