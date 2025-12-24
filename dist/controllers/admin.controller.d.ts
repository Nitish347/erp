import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
export declare function createAdminHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function listAdminsHandler(_req: AuthRequest, res: Response): Promise<void>;
export declare function getAdminByIdHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function updateAdminHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function deleteAdminHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function getAllTeachersHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function getAllStudentsHandler(req: AuthRequest, res: Response): Promise<void>;
//# sourceMappingURL=admin.controller.d.ts.map