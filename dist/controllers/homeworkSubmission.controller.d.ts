import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
export declare function createSubmissionHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function listSubmissionsHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function getSubmissionByIdHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function updateSubmissionHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function gradeSubmissionHandler(req: AuthRequest, res: Response): Promise<void>;
//# sourceMappingURL=homeworkSubmission.controller.d.ts.map