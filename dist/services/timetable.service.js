"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimetableConflicts = exports.deleteTimetable = exports.updateTimetable = exports.getTimetableById = exports.getAllTimetables = exports.getTimetableByStudent = exports.getTimetableByTeacher = exports.createTimetable = void 0;
const Timetable_model_1 = require("../models/Timetable.model");
const createTimetable = async (data) => {
    // Validate teacher exists
    // const teacher = await TeacherModel.findById(data.teacherId);
    // if (!teacher) {
    //   throw new Error('Teacher not found');
    // }
    // // Validate student exists if provided
    // if (data.studentId) {
    //   const student = await StudentModel.findById(data.studentId);
    //   if (!student) {
    //     throw new Error('Student not found');
    //   }
    // }
    // Check for time conflicts
    const conflict = await Timetable_model_1.TimetableModel.findOne({
        teacherId: data.teacherId,
        dayOfWeek: data.dayOfWeek,
        isActive: true,
        $or: [
            {
                startTime: { $lt: data.endTime },
                endTime: { $gt: data.startTime }
            }
        ]
    });
    if (conflict) {
        throw new Error('Time slot conflicts with existing timetable');
    }
    const timetable = new Timetable_model_1.TimetableModel(data);
    return await timetable.save();
};
exports.createTimetable = createTimetable;
const getTimetableByTeacher = async (teacherId, dayOfWeek) => {
    const query = { teacherId, isActive: true };
    if (dayOfWeek) {
        query.dayOfWeek = dayOfWeek;
    }
    return await Timetable_model_1.TimetableModel.find(query)
        .populate('teacherId', 'firstName lastName email department')
        .populate('studentId', 'firstName lastName email enrollmentNumber class section')
        .sort({ dayOfWeek: 1, startTime: 1 });
};
exports.getTimetableByTeacher = getTimetableByTeacher;
const getTimetableByStudent = async (studentId, dayOfWeek) => {
    const query = { studentId, isActive: true };
    if (dayOfWeek) {
        query.dayOfWeek = dayOfWeek;
    }
    return await Timetable_model_1.TimetableModel.find(query)
        .populate('teacherId', 'firstName lastName email department')
        .populate('studentId', 'firstName lastName email enrollmentNumber class section')
        .sort({ dayOfWeek: 1, startTime: 1 });
};
exports.getTimetableByStudent = getTimetableByStudent;
const getAllTimetables = async (filters) => {
    const query = { isActive: true };
    if (filters.teacherId)
        query.teacherId = filters.teacherId;
    if (filters.studentId)
        query.studentId = filters.studentId;
    if (filters.dayOfWeek)
        query.dayOfWeek = filters.dayOfWeek;
    if (filters.subject)
        query.subject = new RegExp(filters.subject, 'i');
    if (filters.class)
        query.class = filters.class;
    if (filters.section)
        query.section = filters.section;
    return await Timetable_model_1.TimetableModel.find(query)
        .populate('teacherId', 'firstName lastName email department')
        .populate('studentId', 'firstName lastName email enrollmentNumber class section')
        .sort({ dayOfWeek: 1, startTime: 1 });
};
exports.getAllTimetables = getAllTimetables;
const getTimetableById = async (id) => {
    return await Timetable_model_1.TimetableModel.findById(id)
        .populate('teacherId', 'firstName lastName email department')
        .populate('studentId', 'firstName lastName email enrollmentNumber class section');
};
exports.getTimetableById = getTimetableById;
const updateTimetable = async (id, data) => {
    // Check for time conflicts if time is being updated
    if (data.startTime || data.endTime || data.dayOfWeek) {
        const existingTimetable = await Timetable_model_1.TimetableModel.findById(id);
        if (!existingTimetable) {
            throw new Error('Timetable not found');
        }
        const conflict = await Timetable_model_1.TimetableModel.findOne({
            _id: { $ne: id },
            teacherId: data.teacherId || existingTimetable.teacherId,
            dayOfWeek: data.dayOfWeek || existingTimetable.dayOfWeek,
            isActive: true,
            $or: [
                {
                    startTime: { $lt: data.endTime || existingTimetable.endTime },
                    endTime: { $gt: data.startTime || existingTimetable.startTime }
                }
            ]
        });
        if (conflict) {
            throw new Error('Time slot conflicts with existing timetable');
        }
    }
    return await Timetable_model_1.TimetableModel.findByIdAndUpdate(id, { ...data, updatedAt: new Date() }, { new: true }).populate('teacherId', 'firstName lastName email department')
        .populate('studentId', 'firstName lastName email enrollmentNumber class section');
};
exports.updateTimetable = updateTimetable;
const deleteTimetable = async (id) => {
    // Soft delete - set isActive to false
    return await Timetable_model_1.TimetableModel.findByIdAndUpdate(id, { isActive: false, updatedAt: new Date() }, { new: true });
};
exports.deleteTimetable = deleteTimetable;
const getTimetableConflicts = async (teacherId, dayOfWeek, startTime, endTime, excludeId) => {
    const query = {
        teacherId,
        dayOfWeek,
        isActive: true,
        $or: [
            {
                startTime: { $lt: endTime },
                endTime: { $gt: startTime }
            }
        ]
    };
    if (excludeId) {
        query._id = { $ne: excludeId };
    }
    return await Timetable_model_1.TimetableModel.find(query)
        .populate('teacherId', 'firstName lastName email department')
        .populate('studentId', 'firstName lastName email enrollmentNumber class section');
};
exports.getTimetableConflicts = getTimetableConflicts;
//# sourceMappingURL=timetable.service.js.map