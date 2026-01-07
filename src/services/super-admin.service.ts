import { AdminModel } from '../models/Admin.model';
import { StudentModel } from '../models/Student.model';
import { TeacherModel } from '../models/Teacher.model';
import { ClassModel } from '../models/Class.model';
import { AttendanceModel } from '../models/Attendance.model';
import { ExamModel } from '../models/Exam.model';
import { FeeModel } from '../models/Fee.model';
import { HomeworkModel } from '../models/Homework.model';
import { NoticeModel } from '../models/Notice.model';
import { TimetableModel } from '../models/Timetable.model';
import { MedicalRecordModel } from '../models/MedicalRecord.model';

// School (Admin) Operations
export async function listAllSchools() {
  const schools = await AdminModel.find().select('-password -otp').lean();
  
  // Get aggregated stats for each school
  const schoolsWithStats = await Promise.all(
    schools.map(async (school) => {
      const studentCount = await StudentModel.countDocuments({ institute: school._id });
      const teacherCount = await TeacherModel.countDocuments({ institute: school._id });
      const classCount = await ClassModel.countDocuments({ institute: school._id });
      
      return {
        ...school,
        stats: {
          students: studentCount,
          teachers: teacherCount,
          classes: classCount,
        },
      };
    })
  );
  
  return schoolsWithStats;
}

export async function getSchoolDetails(schoolId: string) {
  const school = await AdminModel.findById(schoolId).select('-password -otp').lean();
  if (!school) {
    throw new Error('School not found');
  }
  
  // Get detailed stats
  const studentCount = await StudentModel.countDocuments({ institute: schoolId });
  const teacherCount = await TeacherModel.countDocuments({ institute: schoolId });
  const classCount = await ClassModel.countDocuments({ institute: schoolId });
  const attendanceCount = await AttendanceModel.countDocuments({ institute: schoolId });
  const examCount = await ExamModel.countDocuments({ institute: schoolId });
  const feeCount = await FeeModel.countDocuments({ institute: schoolId });
  const homeworkCount = await HomeworkModel.countDocuments({ institute: schoolId });
  const noticeCount = await NoticeModel.countDocuments({ institute: schoolId });
  const timetableCount = await TimetableModel.countDocuments({ institute: schoolId });
  const medicalRecordCount = await MedicalRecordModel.countDocuments({ institute: schoolId });
  
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

export async function updateSchool(schoolId: string, updateData: any) {
  // Don't allow updating password through this endpoint
  delete updateData.password;
  delete updateData.otp;
  delete updateData.otpExpiry;
  
  const updated = await AdminModel.findByIdAndUpdate(
    schoolId,
    { $set: updateData },
    { new: true, runValidators: true }
  ).select('-password -otp');
  
  return updated;
}

export async function deleteSchool(schoolId: string) {
  // Note: Consider soft delete or archiving instead of hard delete
  // For now, we'll delete the school and leave orphaned records
  // In production, you might want to cascade delete or reassign
  const deleted = await AdminModel.findByIdAndDelete(schoolId);
  return deleted;
}

// Cross-School Student Operations
export async function getSchoolStudents(schoolId: string, filters?: any) {
  const query = { institute: schoolId, ...filters };
  const students = await StudentModel.find(query).select('-password').populate('teacher', 'firstName lastName').lean();
  return students;
}

export async function createSchoolStudent(schoolId: string, studentData: any) {
  studentData.institute = schoolId;
  const student = await StudentModel.create(studentData);
  return student;
}

export async function updateAnyStudent(studentId: string, updateData: any) {
  // Don't allow updating password or institute through this endpoint
  delete updateData.password;
  delete updateData.institute;
  
  const updated = await StudentModel.findByIdAndUpdate(
    studentId,
    { $set: updateData },
    { new: true, runValidators: true }
  ).select('-password');
  
  return updated;
}

export async function deleteAnyStudent(studentId: string) {
  const deleted = await StudentModel.findByIdAndDelete(studentId);
  return deleted;
}

export async function getAllStudents() {
  const students = await StudentModel.find()
    .select('-password')
    .populate('institute', 'instituteName city state')
    .populate('teacher', 'firstName lastName')
    .lean();
  return students;
}

// Cross-School Teacher Operations
export async function getSchoolTeachers(schoolId: string, filters?: any) {
  const query = { institute: schoolId, ...filters };
  const teachers = await TeacherModel.find(query).select('-password').lean();
  return teachers;
}

export async function createSchoolTeacher(schoolId: string, teacherData: any) {
  teacherData.institute = schoolId;
  const teacher = await TeacherModel.create(teacherData);
  return teacher;
}

export async function updateAnyTeacher(teacherId: string, updateData: any) {
  // Don't allow updating password or institute through this endpoint
  delete updateData.password;
  delete updateData.institute;
  
  const updated = await TeacherModel.findByIdAndUpdate(
    teacherId,
    { $set: updateData },
    { new: true, runValidators: true }
  ).select('-password');
  
  return updated;
}

export async function deleteAnyTeacher(teacherId: string) {
  const deleted = await TeacherModel.findByIdAndDelete(teacherId);
  return deleted;
}

export async function getAllTeachers() {
  const teachers = await TeacherModel.find()
    .select('-password')
    .populate('institute', 'instituteName city state')
    .lean();
  return teachers;
}

// Cross-School Resource Operations
export async function getSchoolClasses(schoolId: string) {
  const classes = await ClassModel.find({ institute: schoolId }).lean();
  return classes;
}

export async function getSchoolAttendance(schoolId: string, filters?: any) {
  const query = { institute: schoolId, ...filters };
  const attendance = await AttendanceModel.find(query)
    .populate('student', 'firstName lastName enrollmentNumber')
    .populate('teacher', 'firstName lastName')
    .lean();
  return attendance;
}

export async function getSchoolExams(schoolId: string) {
  const exams = await ExamModel.find({ institute: schoolId })
    .populate('subject', 'name')
    .lean();
  return exams;
}

export async function getSchoolFees(schoolId: string) {
  const fees = await FeeModel.find({ institute: schoolId })
    .populate('student', 'firstName lastName enrollmentNumber')
    .lean();
  return fees;
}

export async function getSchoolHomework(schoolId: string) {
  const homework = await HomeworkModel.find({ institute: schoolId })
    .populate('teacher', 'firstName lastName')
    .populate('subject', 'name')
    .lean();
  return homework;
}

export async function getSchoolNotices(schoolId: string) {
  const notices = await NoticeModel.find({ institute: schoolId })
    .populate('createdBy', 'firstName lastName')
    .lean();
  return notices;
}

export async function getSchoolTimetables(schoolId: string) {
  const timetables = await TimetableModel.find({ institute: schoolId })
    .populate('teacher', 'firstName lastName')
    .populate('subject', 'name')
    .lean();
  return timetables;
}

export async function getSchoolMedicalRecords(schoolId: string) {
  const records = await MedicalRecordModel.find({ institute: schoolId })
    .populate('student', 'firstName lastName enrollmentNumber')
    .lean();
  return records;
}

// Dashboard Statistics
export async function getSuperAdminDashboardStats() {
  const totalSchools = await AdminModel.countDocuments();
  const totalStudents = await StudentModel.countDocuments();
  const totalTeachers = await TeacherModel.countDocuments();
  const totalClasses = await ClassModel.countDocuments();
  
  return {
    schools: totalSchools,
    students: totalStudents,
    teachers: totalTeachers,
    classes: totalClasses,
  };
}
