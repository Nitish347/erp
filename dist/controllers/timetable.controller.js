"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTimetableHandler = createTimetableHandler;
exports.getAllTimetablesHandler = getAllTimetablesHandler;
exports.getTimetableByIdHandler = getTimetableByIdHandler;
exports.getTimetableByTeacherHandler = getTimetableByTeacherHandler;
exports.getTimetableByStudentHandler = getTimetableByStudentHandler;
exports.updateTimetableHandler = updateTimetableHandler;
exports.deleteTimetableHandler = deleteTimetableHandler;
exports.getTimetableConflictsHandler = getTimetableConflictsHandler;
const timetable_service_1 = require("../services/timetable.service");
async function createTimetableHandler(req, res) {
    try {
        const timetable = await (0, timetable_service_1.createTimetable)(req.body);
        res.status(201).json({ success: true, data: timetable });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
async function getAllTimetablesHandler(req, res) {
    try {
        const filters = {
            teacherId: req.query.teacherId,
            studentId: req.query.studentId,
            dayOfWeek: req.query.dayOfWeek,
            subject: req.query.subject,
            class: req.query.class,
            section: req.query.section
        };
        const timetables = await (0, timetable_service_1.getAllTimetables)(filters);
        res.json({ success: true, data: timetables });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
async function getTimetableByIdHandler(req, res) {
    try {
        const timetable = await (0, timetable_service_1.getTimetableById)(req.params.id);
        if (!timetable) {
            res.status(404).json({ success: false, message: 'Timetable not found' });
            return;
        }
        res.json({ success: true, data: timetable });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
async function getTimetableByTeacherHandler(req, res) {
    try {
        const { teacherId } = req.params;
        const { dayOfWeek } = req.query;
        const timetables = await (0, timetable_service_1.getTimetableByTeacher)(teacherId, dayOfWeek);
        res.json({ success: true, data: timetables });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
async function getTimetableByStudentHandler(req, res) {
    try {
        const { studentId } = req.params;
        const { dayOfWeek } = req.query;
        const timetables = await (0, timetable_service_1.getTimetableByStudent)(studentId, dayOfWeek);
        res.json({ success: true, data: timetables });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
async function updateTimetableHandler(req, res) {
    try {
        const updated = await (0, timetable_service_1.updateTimetable)(req.params.id, req.body);
        if (!updated) {
            res.status(404).json({ success: false, message: 'Timetable not found' });
            return;
        }
        res.json({ success: true, data: updated });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
async function deleteTimetableHandler(req, res) {
    try {
        const deleted = await (0, timetable_service_1.deleteTimetable)(req.params.id);
        if (!deleted) {
            res.status(404).json({ success: false, message: 'Timetable not found' });
            return;
        }
        res.json({ success: true, message: 'Timetable deleted successfully' });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
async function getTimetableConflictsHandler(req, res) {
    try {
        const { teacherId, dayOfWeek, startTime, endTime, excludeId } = req.query;
        if (!teacherId || !dayOfWeek || !startTime || !endTime) {
            res.status(400).json({
                success: false,
                message: 'teacherId, dayOfWeek, startTime, and endTime are required'
            });
            return;
        }
        const conflicts = await (0, timetable_service_1.getTimetableConflicts)(teacherId, dayOfWeek, startTime, endTime, excludeId);
        res.json({ success: true, data: conflicts });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
//# sourceMappingURL=timetable.controller.js.map