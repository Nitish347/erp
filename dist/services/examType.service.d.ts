export declare function createExamType(data: any): Promise<import("mongoose").Document<unknown, {}, import("../models/ExamType.model").ExamType, {}, {}> & import("../models/ExamType.model").ExamType & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export declare function listExamTypes(filter?: any): Promise<(import("mongoose").Document<unknown, {}, import("../models/ExamType.model").ExamType, {}, {}> & import("../models/ExamType.model").ExamType & Required<{
    _id: unknown;
}> & {
    __v: number;
})[]>;
export declare function getExamTypeById(id: string): Promise<(import("mongoose").Document<unknown, {}, import("../models/ExamType.model").ExamType, {}, {}> & import("../models/ExamType.model").ExamType & Required<{
    _id: unknown;
}> & {
    __v: number;
}) | null>;
export declare function updateExamType(id: string, data: any): Promise<(import("mongoose").Document<unknown, {}, import("../models/ExamType.model").ExamType, {}, {}> & import("../models/ExamType.model").ExamType & Required<{
    _id: unknown;
}> & {
    __v: number;
}) | null>;
export declare function deleteExamType(id: string): Promise<(import("mongoose").Document<unknown, {}, import("../models/ExamType.model").ExamType, {}, {}> & import("../models/ExamType.model").ExamType & Required<{
    _id: unknown;
}> & {
    __v: number;
}) | null>;
//# sourceMappingURL=examType.service.d.ts.map