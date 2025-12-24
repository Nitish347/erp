export interface CreateTimetableData {
    teacherId: string;
    studentId?: string;
    subject: string;
    dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
    startTime: string;
    endTime: string;
    room?: string;
    class?: string;
    section?: string;
}
export declare const createTimetable: (data: CreateTimetableData) => Promise<import("mongoose").Document<unknown, {}, import("../models/Timetable.model").Timetable, {}, {}> & import("../models/Timetable.model").Timetable & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export declare const getTimetableByTeacher: (teacherId: string, dayOfWeek?: string) => Promise<(import("mongoose").Document<unknown, {}, import("../models/Timetable.model").Timetable, {}, {}> & import("../models/Timetable.model").Timetable & Required<{
    _id: unknown;
}> & {
    __v: number;
})[]>;
export declare const getTimetableByStudent: (studentId: string, dayOfWeek?: string) => Promise<(import("mongoose").Document<unknown, {}, import("../models/Timetable.model").Timetable, {}, {}> & import("../models/Timetable.model").Timetable & Required<{
    _id: unknown;
}> & {
    __v: number;
})[]>;
export declare const getAllTimetables: (filters: {
    teacherId?: string;
    studentId?: string;
    dayOfWeek?: string;
    subject?: string;
    class?: string;
    section?: string;
}) => Promise<(import("mongoose").Document<unknown, {}, import("../models/Timetable.model").Timetable, {}, {}> & import("../models/Timetable.model").Timetable & Required<{
    _id: unknown;
}> & {
    __v: number;
})[]>;
export declare const getTimetableById: (id: string) => Promise<(import("mongoose").Document<unknown, {}, import("../models/Timetable.model").Timetable, {}, {}> & import("../models/Timetable.model").Timetable & Required<{
    _id: unknown;
}> & {
    __v: number;
}) | null>;
export declare const updateTimetable: (id: string, data: Partial<CreateTimetableData>) => Promise<(import("mongoose").Document<unknown, {}, import("../models/Timetable.model").Timetable, {}, {}> & import("../models/Timetable.model").Timetable & Required<{
    _id: unknown;
}> & {
    __v: number;
}) | null>;
export declare const deleteTimetable: (id: string) => Promise<(import("mongoose").Document<unknown, {}, import("../models/Timetable.model").Timetable, {}, {}> & import("../models/Timetable.model").Timetable & Required<{
    _id: unknown;
}> & {
    __v: number;
}) | null>;
export declare const getTimetableConflicts: (teacherId: string, dayOfWeek: string, startTime: string, endTime: string, excludeId?: string) => Promise<(import("mongoose").Document<unknown, {}, import("../models/Timetable.model").Timetable, {}, {}> & import("../models/Timetable.model").Timetable & Required<{
    _id: unknown;
}> & {
    __v: number;
})[]>;
//# sourceMappingURL=timetable.service.d.ts.map