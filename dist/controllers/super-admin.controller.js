"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardStatsHandler = getDashboardStatsHandler;
exports.listAllSchoolsHandler = listAllSchoolsHandler;
exports.getSchoolDetailsHandler = getSchoolDetailsHandler;
exports.updateSchoolHandler = updateSchoolHandler;
exports.deleteSchoolHandler = deleteSchoolHandler;
exports.getAllStudentsHandler = getAllStudentsHandler;
exports.getSchoolStudentsHandler = getSchoolStudentsHandler;
exports.createSchoolStudentHandler = createSchoolStudentHandler;
exports.updateStudentHandler = updateStudentHandler;
exports.deleteStudentHandler = deleteStudentHandler;
exports.getAllTeachersHandler = getAllTeachersHandler;
exports.getSchoolTeachersHandler = getSchoolTeachersHandler;
exports.createSchoolTeacherHandler = createSchoolTeacherHandler;
exports.updateTeacherHandler = updateTeacherHandler;
exports.deleteTeacherHandler = deleteTeacherHandler;
exports.getSchoolClassesHandler = getSchoolClassesHandler;
exports.getSchoolAttendanceHandler = getSchoolAttendanceHandler;
exports.getSchoolExamsHandler = getSchoolExamsHandler;
exports.getSchoolFeesHandler = getSchoolFeesHandler;
exports.getSchoolHomeworkHandler = getSchoolHomeworkHandler;
exports.getSchoolNoticesHandler = getSchoolNoticesHandler;
exports.getSchoolTimetablesHandler = getSchoolTimetablesHandler;
exports.getSchoolMedicalRecordsHandler = getSchoolMedicalRecordsHandler;
const super_admin_service_1 = require("../services/super-admin.service");
// Dashboard
async function getDashboardStatsHandler(req, res) {
    try {
        const stats = await (0, super_admin_service_1.getSuperAdminDashboardStats)();
        res.json({ success: true, data: stats });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
// School Management
async function listAllSchoolsHandler(req, res) {
    try {
        const schools = await (0, super_admin_service_1.listAllSchools)();
        res.json({ success: true, data: schools });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
async function getSchoolDetailsHandler(req, res) {
    try {
        if (!req.params.id) {
            res.status(400).json({ success: false, message: 'School ID is required' });
            return;
        }
        const school = await (0, super_admin_service_1.getSchoolDetails)(req.params.id);
        res.json({ success: true, data: school });
    }
    catch (error) {
        if (error.message === 'School not found') {
            res.status(404).json({ success: false, message: error.message });
        }
        else {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}
async function updateSchoolHandler(req, res) {
    try {
        if (!req.params.id) {
            res.status(400).json({ success: false, message: 'School ID is required' });
            return;
        }
        const updated = await (0, super_admin_service_1.updateSchool)(req.params.id, req.body);
        if (!updated) {
            res.status(404).json({ success: false, message: 'School not found' });
            return;
        }
        res.json({ success: true, data: updated });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
async function deleteSchoolHandler(req, res) {
    try {
        if (!req.params.id) {
            res.status(400).json({ success: false, message: 'School ID is required' });
            return;
        }
        const deleted = await (0, super_admin_service_1.deleteSchool)(req.params.id);
        if (!deleted) {
            res.status(404).json({ success: false, message: 'School not found' });
            return;
        }
        res.json({ success: true, message: 'School deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
// Student Management
async function getAllStudentsHandler(req, res) {
    try {
        const students = await (0, super_admin_service_1.getAllStudents)();
        res.json({ success: true, data: students });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
async function getSchoolStudentsHandler(req, res) {
    try {
        if (!req.params.schoolId) {
            res.status(400).json({ success: false, message: 'School ID is required' });
            return;
        }
        const students = await (0, super_admin_service_1.getSchoolStudents)(req.params.schoolId, req.query);
        res.json({ success: true, data: students });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
async function createSchoolStudentHandler(req, res) {
    try {
        if (!req.params.schoolId) {
            res.status(400).json({ success: false, message: 'School ID is required' });
            return;
        }
        const student = await (0, super_admin_service_1.createSchoolStudent)(req.params.schoolId, req.body);
        const studentData = student.toObject();
        delete studentData.password;
        res.status(201).json({ success: true, data: studentData });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
async function updateStudentHandler(req, res) {
    try {
        if (!req.params.id) {
            res.status(400).json({ success: false, message: 'Student ID is required' });
            return;
        }
        const updated = await (0, super_admin_service_1.updateAnyStudent)(req.params.id, req.body);
        if (!updated) {
            res.status(404).json({ success: false, message: 'Student not found' });
            return;
        }
        res.json({ success: true, data: updated });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
async function deleteStudentHandler(req, res) {
    try {
        if (!req.params.id) {
            res.status(400).json({ success: false, message: 'Student ID is required' });
            return;
        }
        const deleted = await (0, super_admin_service_1.deleteAnyStudent)(req.params.id);
        if (!deleted) {
            res.status(404).json({ success: false, message: 'Student not found' });
            return;
        }
        res.json({ success: true, message: 'Student deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
// Teacher Management
async function getAllTeachersHandler(req, res) {
    try {
        const teachers = await (0, super_admin_service_1.getAllTeachers)();
        res.json({ success: true, data: teachers });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
async function getSchoolTeachersHandler(req, res) {
    try {
        if (!req.params.schoolId) {
            res.status(400).json({ success: false, message: 'School ID is required' });
            return;
        }
        const teachers = await (0, super_admin_service_1.getSchoolTeachers)(req.params.schoolId, req.query);
        res.json({ success: true, data: teachers });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
async function createSchoolTeacherHandler(req, res) {
    try {
        if (!req.params.schoolId) {
            res.status(400).json({ success: false, message: 'School ID is required' });
            return;
        }
        const teacher = await (0, super_admin_service_1.createSchoolTeacher)(req.params.schoolId, req.body);
        const teacherData = teacher.toObject();
        delete teacherData.password;
        res.status(201).json({ success: true, data: teacherData });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
async function updateTeacherHandler(req, res) {
    try {
        if (!req.params.id) {
            res.status(400).json({ success: false, message: 'Teacher ID is required' });
            return;
        }
        const updated = await (0, super_admin_service_1.updateAnyTeacher)(req.params.id, req.body);
        if (!updated) {
            res.status(404).json({ success: false, message: 'Teacher not found' });
            return;
        }
        res.json({ success: true, data: updated });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
async function deleteTeacherHandler(req, res) {
    try {
        if (!req.params.id) {
            res.status(400).json({ success: false, message: 'Teacher ID is required' });
            return;
        }
        const deleted = await (0, super_admin_service_1.deleteAnyTeacher)(req.params.id);
        if (!deleted) {
            res.status(404).json({ success: false, message: 'Teacher not found' });
            return;
        }
        res.json({ success: true, message: 'Teacher deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
// Resource Management
async function getSchoolClassesHandler(req, res) {
    try {
        if (!req.params.schoolId) {
            res.status(400).json({ success: false, message: 'School ID is required' });
            return;
        }
        const classes = await (0, super_admin_service_1.getSchoolClasses)(req.params.schoolId);
        res.json({ success: true, data: classes });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
async function getSchoolAttendanceHandler(req, res) {
    try {
        if (!req.params.schoolId) {
            res.status(400).json({ success: false, message: 'School ID is required' });
            return;
        }
        const attendance = await (0, super_admin_service_1.getSchoolAttendance)(req.params.schoolId, req.query);
        res.json({ success: true, data: attendance });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
async function getSchoolExamsHandler(req, res) {
    try {
        if (!req.params.schoolId) {
            res.status(400).json({ success: false, message: 'School ID is required' });
            return;
        }
        const exams = await (0, super_admin_service_1.getSchoolExams)(req.params.schoolId);
        res.json({ success: true, data: exams });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
async function getSchoolFeesHandler(req, res) {
    try {
        if (!req.params.schoolId) {
            res.status(400).json({ success: false, message: 'School ID is required' });
            return;
        }
        const fees = await (0, super_admin_service_1.getSchoolFees)(req.params.schoolId);
        res.json({ success: true, data: fees });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
async function getSchoolHomeworkHandler(req, res) {
    try {
        if (!req.params.schoolId) {
            res.status(400).json({ success: false, message: 'School ID is required' });
            return;
        }
        const homework = await (0, super_admin_service_1.getSchoolHomework)(req.params.schoolId);
        res.json({ success: true, data: homework });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
async function getSchoolNoticesHandler(req, res) {
    try {
        if (!req.params.schoolId) {
            res.status(400).json({ success: false, message: 'School ID is required' });
            return;
        }
        const notices = await (0, super_admin_service_1.getSchoolNotices)(req.params.schoolId);
        res.json({ success: true, data: notices });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
async function getSchoolTimetablesHandler(req, res) {
    try {
        if (!req.params.schoolId) {
            res.status(400).json({ success: false, message: 'School ID is required' });
            return;
        }
        const timetables = await (0, super_admin_service_1.getSchoolTimetables)(req.params.schoolId);
        res.json({ success: true, data: timetables });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
async function getSchoolMedicalRecordsHandler(req, res) {
    try {
        if (!req.params.schoolId) {
            res.status(400).json({ success: false, message: 'School ID is required' });
            return;
        }
        const records = await (0, super_admin_service_1.getSchoolMedicalRecords)(req.params.schoolId);
        res.json({ success: true, data: records });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
//# sourceMappingURL=super-admin.controller.js.map