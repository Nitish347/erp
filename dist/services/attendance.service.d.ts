export interface CreateAttendanceData {
    teacherId: string;
    studentId?: string;
    date?: Date;
    status: 'Present' | 'Absent' | 'Late' | 'Excused';
    subject?: string;
    class?: string;
    section?: string;
    remarks?: string;
    markedBy: string;
}
export interface AttendanceStats {
    totalDays: number;
    presentDays: number;
    absentDays: number;
    lateDays: number;
    excusedDays: number;
    attendancePercentage: number;
}
export declare const markAttendance: (data: CreateAttendanceData) => Promise<(import("mongoose").Document<unknown, {}, import("../models/Attendance.model").Attendance, {}, {}> & import("../models/Attendance.model").Attendance & Required<{
    _id: unknown;
}> & {
    __v: number;
}) | null>;
export declare const getAttendanceByTeacher: (teacherId: string, startDate?: Date, endDate?: Date) => Promise<(import("mongoose").Document<unknown, {}, import("../models/Attendance.model").Attendance, {}, {}> & import("../models/Attendance.model").Attendance & Required<{
    _id: unknown;
}> & {
    __v: number;
})[]>;
export declare const getAttendanceByStudent: (studentId: string, startDate?: Date, endDate?: Date) => Promise<(import("mongoose").Document<unknown, {}, import("../models/Attendance.model").Attendance, {}, {}> & import("../models/Attendance.model").Attendance & Required<{
    _id: unknown;
}> & {
    __v: number;
})[]>;
export declare const getAllAttendance: (filters: {
    teacherId?: string;
    studentId?: string;
    startDate?: Date;
    endDate?: Date;
    status?: string;
    subject?: string;
    class?: string;
    section?: string;
}) => Promise<(import("mongoose").Document<unknown, {}, import("../models/Attendance.model").Attendance, {}, {}> & import("../models/Attendance.model").Attendance & Required<{
    _id: unknown;
}> & {
    __v: number;
})[]>;
export declare const getAttendanceById: (id: string) => Promise<(import("mongoose").Document<unknown, {}, import("../models/Attendance.model").Attendance, {}, {}> & import("../models/Attendance.model").Attendance & Required<{
    _id: unknown;
}> & {
    __v: number;
}) | null>;
export declare const updateAttendance: (id: string, data: Partial<CreateAttendanceData>) => Promise<(import("mongoose").Document<unknown, {}, import("../models/Attendance.model").Attendance, {}, {}> & import("../models/Attendance.model").Attendance & Required<{
    _id: unknown;
}> & {
    __v: number;
}) | null>;
export declare const deleteAttendance: (id: string) => Promise<(import("mongoose").Document<unknown, {}, import("../models/Attendance.model").Attendance, {}, {}> & import("../models/Attendance.model").Attendance & Required<{
    _id: unknown;
}> & {
    __v: number;
}) | null>;
export declare const getAttendanceStats: (teacherId?: string, studentId?: string, startDate?: Date, endDate?: Date) => Promise<AttendanceStats>;
export declare const getDailyAttendance: (date: Date, teacherId?: string, className?: string, section?: string) => Promise<(import("mongoose").Document<unknown, {}, import("../models/Attendance.model").Attendance, {}, {}> & import("../models/Attendance.model").Attendance & Required<{
    _id: unknown;
}> & {
    __v: number;
})[]>;
export declare const bulkMarkAttendance: (attendanceData: CreateAttendanceData[]) => Promise<({
    success: boolean;
    data: (import("mongoose").Document<unknown, {}, import("../models/Attendance.model").Attendance, {}, {}> & import("../models/Attendance.model").Attendance & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null;
    error?: never;
} | {
    success: boolean;
    error: any;
    data: CreateAttendanceData;
})[]>;
//# sourceMappingURL=attendance.service.d.ts.map