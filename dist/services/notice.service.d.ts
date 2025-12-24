import { Notice } from '../models/Notice.model';
export declare function createNotice(data: Partial<Notice>): Promise<Notice>;
export declare function listNotices(filter?: any): Promise<Notice[]>;
export declare function getNoticeById(id: string): Promise<Notice | null>;
export declare function updateNotice(id: string, data: Partial<Notice>): Promise<Notice | null>;
export declare function deleteNotice(id: string): Promise<Notice | null>;
export declare function getActiveNotices(instituteId: string): Promise<Notice[]>;
export declare function getNoticesByClass(instituteId: string, classId: string, section?: string): Promise<Notice[]>;
//# sourceMappingURL=notice.service.d.ts.map