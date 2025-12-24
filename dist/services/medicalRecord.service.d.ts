import { MedicalRecord } from '../models/MedicalRecord.model';
export declare function createRecord(data: Partial<MedicalRecord>): Promise<MedicalRecord>;
export declare function listRecords(filter?: any): Promise<MedicalRecord[]>;
export declare function getRecordById(id: string): Promise<MedicalRecord | null>;
export declare function updateRecord(id: string, data: Partial<MedicalRecord>): Promise<MedicalRecord | null>;
export declare function deleteRecord(id: string): Promise<MedicalRecord | null>;
export declare function getRecordsByStudent(userId: string): Promise<MedicalRecord[]>;
export declare function getRecordsByDateRange(userId: string, startDate: Date, endDate: Date): Promise<MedicalRecord[]>;
//# sourceMappingURL=medicalRecord.service.d.ts.map