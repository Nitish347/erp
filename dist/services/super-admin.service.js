"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAllSchools = listAllSchools;
exports.getSchoolDetails = getSchoolDetails;
exports.updateSchool = updateSchool;
exports.deleteSchool = deleteSchool;
exports.getSchoolStudents = getSchoolStudents;
exports.createSchoolStudent = createSchoolStudent;
exports.updateAnyStudent = updateAnyStudent;
exports.deleteAnyStudent = deleteAnyStudent;
exports.getAllStudents = getAllStudents;
exports.getSchoolTeachers = getSchoolTeachers;
exports.createSchoolTeacher = createSchoolTeacher;
exports.updateAnyTeacher = updateAnyTeacher;
exports.deleteAnyTeacher = deleteAnyTeacher;
exports.getAllTeachers = getAllTeachers;
exports.getSchoolClasses = getSchoolClasses;
exports.getSchoolAttendance = getSchoolAttendance;
exports.getSchoolExams = getSchoolExams;
exports.getSchoolFees = getSchoolFees;
exports.getSchoolHomework = getSchoolHomework;
exports.getSchoolNotices = getSchoolNotices;
exports.getSchoolTimetables = getSchoolTimetables;
exports.getSchoolMedicalRecords = getSchoolMedicalRecords;
exports.getSuperAdminDashboardStats = getSuperAdminDashboardStats;
const Admin_model_1 = require("../models/Admin.model");
const Student_model_1 = require("../models/Student.model");
const Teacher_model_1 = require("../models/Teacher.model");
const Class_model_1 = require("../models/Class.model");
const Attendance_model_1 = require("../models/Attendance.model");
const Exam_model_1 = require("../models/Exam.model");
const Fee_model_1 = require("../models/Fee.model");
const Homework_model_1 = require("../models/Homework.model");
const Notice_model_1 = require("../models/Notice.model");
const Timetable_model_1 = require("../models/Timetable.model");
const MedicalRecord_model_1 = require("../models/MedicalRecord.model");
// School (Admin) Operations
async function listAllSchools() {
    const schools = await Admin_model_1.AdminModel.find().select('-password -otp').lean();
    // Get aggregated stats for each school
    const schoolsWithStats = await Promise.all(schools.map(async (school) => {
        const studentCount = await Student_model_1.StudentModel.countDocuments({ institute: school._id });
        const teacherCount = await Teacher_model_1.TeacherModel.countDocuments({ institute: school._id });
        const classCount = await Class_model_1.ClassModel.countDocuments({ institute: school._id });
        return {
            ...school,
            stats: {
                students: studentCount,
                teachers: teacherCount,
                classes: classCount,
            },
        };
    }));
    return schoolsWithStats;
}
async function getSchoolDetails(schoolId) {
    const school = await Admin_model_1.AdminModel.findById(schoolId).select('-password -otp').lean();
    if (!school) {
        throw new Error('School not found');
    }
    // Get detailed stats
    const studentCount = await Student_model_1.StudentModel.countDocuments({ institute: schoolId });
    const teacherCount = await Teacher_model_1.TeacherModel.countDocuments({ institute: schoolId });
    const classCount = await Class_model_1.ClassModel.countDocuments({ institute: schoolId });
    const attendanceCount = await Attendance_model_1.AttendanceModel.countDocuments({ institute: schoolId });
    const examCount = await Exam_model_1.ExamModel.countDocuments({ institute: schoolId });
    const feeCount = await Fee_model_1.FeeModel.countDocuments({ institute: schoolId });
    const homeworkCount = await Homework_model_1.HomeworkModel.countDocuments({ institute: schoolId });
    const noticeCount = await Notice_model_1.NoticeModel.countDocuments({ institute: schoolId });
    const timetableCount = await Timetable_model_1.TimetableModel.countDocuments({ institute: schoolId });
    const medicalRecordCount = await MedicalRecord_model_1.MedicalRecordModel.countDocuments({ institute: schoolId });
    return {
        ...school,
        stats: {
            students: studentCount,
            teachers: teacherCount,
            classes: classCount,
            attendance: attendanceCount,
            exams: examCount,
            fees: feeCount,
            homework: homeworkCount,
            notices: noticeCount,
            timetables: timetableCount,
            medicalRecords: medicalRecordCount,
        },
    };
}
async function updateSchool(schoolId, updateData) {
    // Don't allow updating password through this endpoint
    delete updateData.password;
    delete updateData.otp;
    delete updateData.otpExpiry;
    const updated = await Admin_model_1.AdminModel.findByIdAndUpdate(schoolId, { $set: updateData }, { new: true, runValidators: true }).select('-password -otp');
    return updated;
}
async function deleteSchool(schoolId) {
    // Note: Consider soft delete or archiving instead of hard delete
    // For now, we'll delete the school and leave orphaned records
    // In production, you might want to cascade delete or reassign
    const deleted = await Admin_model_1.AdminModel.findByIdAndDelete(schoolId);
    return deleted;
}
// Cross-School Student Operations
async function getSchoolStudents(schoolId, filters) {
    const query = { institute: schoolId, ...filters };
    const students = await Student_model_1.StudentModel.find(query).select('-password').populate('teacher', 'firstName lastName').lean();
    return students;
}
async function createSchoolStudent(schoolId, studentData) {
    studentData.institute = schoolId;
    const student = await Student_model_1.StudentModel.create(studentData);
    return student;
}
async function updateAnyStudent(studentId, updateData) {
    // Don't allow updating password or institute through this endpoint
    delete updateData.password;
    delete updateData.institute;
    const updated = await Student_model_1.StudentModel.findByIdAndUpdate(studentId, { $set: updateData }, { new: true, runValidators: true }).select('-password');
    return updated;
}
async function deleteAnyStudent(studentId) {
    const deleted = await Student_model_1.StudentModel.findByIdAndDelete(studentId);
    return deleted;
}
async function getAllStudents() {
    const students = await Student_model_1.StudentModel.find()
        .select('-password')
        .populate('institute', 'instituteName city state')
        .populate('teacher', 'firstName lastName')
        .lean();
    return students;
}
// Cross-School Teacher Operations
async function getSchoolTeachers(schoolId, filters) {
    const query = { institute: schoolId, ...filters };
    const teachers = await Teacher_model_1.TeacherModel.find(query).select('-password').lean();
    return teachers;
}
async function createSchoolTeacher(schoolId, teacherData) {
    teacherData.institute = schoolId;
    const teacher = await Teacher_model_1.TeacherModel.create(teacherData);
    return teacher;
}
async function updateAnyTeacher(teacherId, updateData) {
    // Don't allow updating password or institute through this endpoint
    delete updateData.password;
    delete updateData.institute;
    const updated = await Teacher_model_1.TeacherModel.findByIdAndUpdate(teacherId, { $set: updateData }, { new: true, runValidators: true }).select('-password');
    return updated;
}
async function deleteAnyTeacher(teacherId) {
    const deleted = await Teacher_model_1.TeacherModel.findByIdAndDelete(teacherId);
    return deleted;
}
async function getAllTeachers() {
    const teachers = await Teacher_model_1.TeacherModel.find()
        .select('-password')
        .populate('institute', 'instituteName city state')
        .lean();
    return teachers;
}
// Cross-School Resource Operations
async function getSchoolClasses(schoolId) {
    const classes = await Class_model_1.ClassModel.find({ institute: schoolId }).lean();
    return classes;
}
async function getSchoolAttendance(schoolId, filters) {
    const query = { institute: schoolId, ...filters };
    const attendance = await Attendance_model_1.AttendanceModel.find(query)
        .populate('student', 'firstName lastName enrollmentNumber')
        .populate('teacher', 'firstName lastName')
        .lean();
    return attendance;
}
async function getSchoolExams(schoolId) {
    const exams = await Exam_model_1.ExamModel.find({ institute: schoolId })
        .populate('subject', 'name')
        .lean();
    return exams;
}
async function getSchoolFees(schoolId) {
    const fees = await Fee_model_1.FeeModel.find({ institute: schoolId })
        .populate('student', 'firstName lastName enrollmentNumber')
        .lean();
    return fees;
}
async function getSchoolHomework(schoolId) {
    const homework = await Homework_model_1.HomeworkModel.find({ institute: schoolId })
        .populate('teacher', 'firstName lastName')
        .populate('subject', 'name')
        .lean();
    return homework;
}
async function getSchoolNotices(schoolId) {
    const notices = await Notice_model_1.NoticeModel.find({ institute: schoolId })
        .populate('createdBy', 'firstName lastName')
        .lean();
    return notices;
}
async function getSchoolTimetables(schoolId) {
    const timetables = await Timetable_model_1.TimetableModel.find({ institute: schoolId })
        .populate('teacher', 'firstName lastName')
        .populate('subject', 'name')
        .lean();
    return timetables;
}
async function getSchoolMedicalRecords(schoolId) {
    const records = await MedicalRecord_model_1.MedicalRecordModel.find({ institute: schoolId })
        .populate('student', 'firstName lastName enrollmentNumber')
        .lean();
    return records;
}
// Dashboard Statistics
async function getSuperAdminDashboardStats() {
    const totalSchools = await Admin_model_1.AdminModel.countDocuments();
    const totalStudents = await Student_model_1.StudentModel.countDocuments();
    const totalTeachers = await Teacher_model_1.TeacherModel.countDocuments();
    const totalClasses = await Class_model_1.ClassModel.countDocuments();
    return {
        schools: totalSchools,
        students: totalStudents,
        teachers: totalTeachers,
        classes: totalClasses,
    };
}
//# sourceMappingURL=super-admin.service.js.map