"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markAttendanceHandler = markAttendanceHandler;
exports.getAllAttendanceHandler = getAllAttendanceHandler;
exports.getAttendanceByIdHandler = getAttendanceByIdHandler;
exports.getAttendanceByTeacherHandler = getAttendanceByTeacherHandler;
exports.getAttendanceByStudentHandler = getAttendanceByStudentHandler;
exports.updateAttendanceHandler = updateAttendanceHandler;
exports.deleteAttendanceHandler = deleteAttendanceHandler;
exports.getAttendanceStatsHandler = getAttendanceStatsHandler;
exports.getDailyAttendanceHandler = getDailyAttendanceHandler;
exports.bulkMarkAttendanceHandler = bulkMarkAttendanceHandler;
const attendance_service_1 = require("../services/attendance.service");
async function markAttendanceHandler(req, res) {
    try {
        const attendance = await (0, attendance_service_1.markAttendance)(req.body);
        res.status(201).json({ success: true, data: attendance });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
async function getAllAttendanceHandler(req, res) {
    try {
        const queryFilters = {};
        if (req.query.teacherId)
            queryFilters.teacherId = req.query.teacherId;
        if (req.query.studentId)
            queryFilters.studentId = req.query.studentId;
        if (req.query.startDate)
            queryFilters.startDate = new Date(req.query.startDate);
        if (req.query.endDate)
            queryFilters.endDate = new Date(req.query.endDate);
        if (req.query.status)
            queryFilters.status = req.query.status;
        if (req.query.subject)
            queryFilters.subject = req.query.subject;
        if (req.query.class)
            queryFilters.class = req.query.class;
        if (req.query.section)
            queryFilters.section = req.query.section;
        const attendance = await (0, attendance_service_1.getAllAttendance)(queryFilters);
        res.json({ success: true, data: attendance });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
async function getAttendanceByIdHandler(req, res) {
    try {
        const attendance = await (0, attendance_service_1.getAttendanceById)(req.params.id);
        if (!attendance) {
            res.status(404).json({ success: false, message: 'Attendance record not found' });
            return;
        }
        res.json({ success: true, data: attendance });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
async function getAttendanceByTeacherHandler(req, res) {
    try {
        const { teacherId } = req.params;
        const startDate = req.query.startDate ? new Date(req.query.startDate) : undefined;
        const endDate = req.query.endDate ? new Date(req.query.endDate) : undefined;
        const attendance = await (0, attendance_service_1.getAttendanceByTeacher)(teacherId, startDate, endDate);
        res.json({ success: true, data: attendance });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
async function getAttendanceByStudentHandler(req, res) {
    try {
        const { studentId } = req.params;
        const startDate = req.query.startDate ? new Date(req.query.startDate) : undefined;
        const endDate = req.query.endDate ? new Date(req.query.endDate) : undefined;
        const attendance = await (0, attendance_service_1.getAttendanceByStudent)(studentId, startDate, endDate);
        res.json({ success: true, data: attendance });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
async function updateAttendanceHandler(req, res) {
    try {
        const updated = await (0, attendance_service_1.updateAttendance)(req.params.id, req.body);
        if (!updated) {
            res.status(404).json({ success: false, message: 'Attendance record not found' });
            return;
        }
        res.json({ success: true, data: updated });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
async function deleteAttendanceHandler(req, res) {
    try {
        const deleted = await (0, attendance_service_1.deleteAttendance)(req.params.id);
        if (!deleted) {
            res.status(404).json({ success: false, message: 'Attendance record not found' });
            return;
        }
        res.json({ success: true, message: 'Attendance record deleted successfully' });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
async function getAttendanceStatsHandler(req, res) {
    try {
        const teacherId = req.query.teacherId;
        const studentId = req.query.studentId;
        const startDate = req.query.startDate ? new Date(req.query.startDate) : undefined;
        const endDate = req.query.endDate ? new Date(req.query.endDate) : undefined;
        const stats = await (0, attendance_service_1.getAttendanceStats)(teacherId, studentId, startDate, endDate);
        res.json({ success: true, data: stats });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
async function getDailyAttendanceHandler(req, res) {
    try {
        const { date } = req.params;
        const teacherId = req.query.teacherId;
        const classFilter = req.query.class;
        const section = req.query.section;
        const attendanceDate = new Date(date);
        const attendance = await (0, attendance_service_1.getDailyAttendance)(attendanceDate, teacherId, classFilter, section);
        res.json({ success: true, data: attendance });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
async function bulkMarkAttendanceHandler(req, res) {
    try {
        const { attendanceData } = req.body;
        if (!Array.isArray(attendanceData)) {
            res.status(400).json({
                success: false,
                message: 'attendanceData must be an array'
            });
            return;
        }
        const results = await (0, attendance_service_1.bulkMarkAttendance)(attendanceData);
        res.json({ success: true, data: results });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
//# sourceMappingURL=attendance.controller.js.map