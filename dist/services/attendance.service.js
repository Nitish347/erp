"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulkMarkAttendance = exports.getDailyAttendance = exports.getAttendanceStats = exports.deleteAttendance = exports.updateAttendance = exports.getAttendanceById = exports.getAllAttendance = exports.getAttendanceByStudent = exports.getAttendanceByTeacher = exports.markAttendance = void 0;
const Attendance_model_1 = require("../models/Attendance.model");
const Teacher_model_1 = require("../models/Teacher.model");
const Student_model_1 = require("../models/Student.model");
const Admin_model_1 = require("../models/Admin.model");
const markAttendance = async (data) => {
    // Validate teacher exists
    let teacher = await Teacher_model_1.TeacherModel.findById(data.teacherId);
    if (!teacher) {
        // Check if it is an Admin (Institution) instead
        teacher = await Admin_model_1.AdminModel.findById(data.teacherId);
        if (!teacher) {
            throw new Error('Teacher or Institution not found');
        }
    }
    // Validate student exists if provided
    if (data.studentId) {
        const student = await Student_model_1.StudentModel.findById(data.studentId);
        if (!student) {
            throw new Error('Student not found');
        }
    }
    // Check if attendance already exists for this teacher/student on this date
    const existingAttendance = await Attendance_model_1.AttendanceModel.findOne({
        teacherId: data.teacherId,
        studentId: data.studentId || null,
        date: {
            $gte: new Date(data.date || new Date()).setHours(0, 0, 0, 0),
            $lt: new Date(data.date || new Date()).setHours(23, 59, 59, 999)
        }
    });
    if (existingAttendance) {
        // Update existing attendance
        return await Attendance_model_1.AttendanceModel.findByIdAndUpdate(existingAttendance._id, {
            ...data,
            markedAt: new Date(),
            updatedAt: new Date()
        }, { new: true }).populate('teacherId', 'firstName lastName email department')
            .populate('studentId', 'firstName lastName email enrollmentNumber class section');
    }
    // Create new attendance record
    const attendance = new Attendance_model_1.AttendanceModel({
        ...data,
        date: data.date || new Date(),
        markedAt: new Date()
    });
    return await attendance.save();
};
exports.markAttendance = markAttendance;
const getAttendanceByTeacher = async (teacherId, startDate, endDate) => {
    const query = { teacherId };
    if (startDate && endDate) {
        query.date = {
            $gte: startDate,
            $lte: endDate
        };
    }
    return await Attendance_model_1.AttendanceModel.find(query)
        .populate('teacherId', 'firstName lastName email department')
        .populate('studentId', 'firstName lastName email enrollmentNumber class section')
        .sort({ date: -1, createdAt: -1 });
};
exports.getAttendanceByTeacher = getAttendanceByTeacher;
const getAttendanceByStudent = async (studentId, startDate, endDate) => {
    const query = { studentId };
    if (startDate && endDate) {
        query.date = {
            $gte: startDate,
            $lte: endDate
        };
    }
    return await Attendance_model_1.AttendanceModel.find(query)
        .populate('teacherId', 'firstName lastName email department')
        .populate('studentId', 'firstName lastName email enrollmentNumber class section')
        .sort({ date: -1, createdAt: -1 });
};
exports.getAttendanceByStudent = getAttendanceByStudent;
const getAllAttendance = async (filters) => {
    const query = {};
    if (filters.teacherId)
        query.teacherId = filters.teacherId;
    if (filters.studentId)
        query.studentId = filters.studentId;
    if (filters.status)
        query.status = filters.status;
    if (filters.subject)
        query.subject = new RegExp(filters.subject, 'i');
    if (filters.class)
        query.class = filters.class;
    if (filters.section)
        query.section = filters.section;
    if (filters.startDate && filters.endDate) {
        query.date = {
            $gte: filters.startDate,
            $lte: filters.endDate
        };
    }
    return await Attendance_model_1.AttendanceModel.find(query)
        .populate('teacherId', 'firstName lastName email department')
        .populate('studentId', 'firstName lastName email enrollmentNumber class section')
        .sort({ date: -1, createdAt: -1 });
};
exports.getAllAttendance = getAllAttendance;
const getAttendanceById = async (id) => {
    return await Attendance_model_1.AttendanceModel.findById(id)
        .populate('teacherId', 'firstName lastName email department')
        .populate('studentId', 'firstName lastName email enrollmentNumber class section');
};
exports.getAttendanceById = getAttendanceById;
const updateAttendance = async (id, data) => {
    return await Attendance_model_1.AttendanceModel.findByIdAndUpdate(id, {
        ...data,
        markedAt: new Date(),
        updatedAt: new Date()
    }, { new: true }).populate('teacherId', 'firstName lastName email department')
        .populate('studentId', 'firstName lastName email enrollmentNumber class section');
};
exports.updateAttendance = updateAttendance;
const deleteAttendance = async (id) => {
    return await Attendance_model_1.AttendanceModel.findByIdAndDelete(id);
};
exports.deleteAttendance = deleteAttendance;
const getAttendanceStats = async (teacherId, studentId, startDate, endDate) => {
    const query = {};
    if (teacherId)
        query.teacherId = teacherId;
    if (studentId)
        query.studentId = studentId;
    if (startDate && endDate) {
        query.date = {
            $gte: startDate,
            $lte: endDate
        };
    }
    const attendanceRecords = await Attendance_model_1.AttendanceModel.find(query);
    const totalDays = attendanceRecords.length;
    const presentDays = attendanceRecords.filter(record => record.status === 'Present').length;
    const absentDays = attendanceRecords.filter(record => record.status === 'Absent').length;
    const lateDays = attendanceRecords.filter(record => record.status === 'Late').length;
    const excusedDays = attendanceRecords.filter(record => record.status === 'Excused').length;
    const attendancePercentage = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;
    return {
        totalDays,
        presentDays,
        absentDays,
        lateDays,
        excusedDays,
        attendancePercentage
    };
};
exports.getAttendanceStats = getAttendanceStats;
const getDailyAttendance = async (date, teacherId, className, section) => {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    const query = {
        date: {
            $gte: startOfDay,
            $lte: endOfDay
        }
    };
    if (teacherId)
        query.teacherId = teacherId;
    if (className)
        query.class = className;
    if (section)
        query.section = section;
    return await Attendance_model_1.AttendanceModel.find(query)
        .populate('teacherId', 'firstName lastName email department')
        .populate('studentId', 'firstName lastName email enrollmentNumber class section')
        .sort({ createdAt: 1 });
};
exports.getDailyAttendance = getDailyAttendance;
const bulkMarkAttendance = async (attendanceData) => {
    const results = [];
    for (const data of attendanceData) {
        try {
            const result = await (0, exports.markAttendance)(data);
            results.push({ success: true, data: result });
        }
        catch (error) {
            results.push({ success: false, error: error.message, data });
        }
    }
    return results;
};
exports.bulkMarkAttendance = bulkMarkAttendance;
//# sourceMappingURL=attendance.service.js.map