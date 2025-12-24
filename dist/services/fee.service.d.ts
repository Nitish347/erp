import { Fee } from '../models/Fee.model';
export declare function createFee(data: Partial<Fee>): Promise<Fee>;
export declare function listFees(filter?: any): Promise<Fee[]>;
export declare function getFeeById(id: string): Promise<Fee | null>;
export declare function updateFee(id: string, data: Partial<Fee>): Promise<Fee | null>;
export declare function deleteFee(id: string): Promise<Fee | null>;
export declare function recordPayment(id: string, paymentData: {
    paidAmount: number;
    paymentMethod: string;
    transactionId?: string;
}): Promise<Fee | null>;
export declare function getFeesByStudent(studentId: string): Promise<Fee[]>;
export declare function getPendingFees(studentId: string): Promise<Fee[]>;
export declare function updateOverdueFees(): Promise<void>;
//# sourceMappingURL=fee.service.d.ts.map