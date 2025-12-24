import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
export declare function createRecordHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function listRecordsHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function getRecordByIdHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function updateRecordHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function deleteRecordHandler(req: AuthRequest, res: Response): Promise<void>;
//# sourceMappingURL=medicalRecord.controller.d.ts.map