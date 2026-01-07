import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import {
  listAllSchools,
  getSchoolDetails,
  updateSchool,
  deleteSchool,
  getSchoolStudents,
  createSchoolStudent,
  updateAnyStudent,
  deleteAnyStudent,
  getAllStudents,
  getSchoolTeachers,
  createSchoolTeacher,
  updateAnyTeacher,
  deleteAnyTeacher,
  getAllTeachers,
  getSchoolClasses,
  getSchoolAttendance,
  getSchoolExams,
  getSchoolFees,
  getSchoolHomework,
  getSchoolNotices,
  getSchoolTimetables,
  getSchoolMedicalRecords,
  getSuperAdminDashboardStats,
} from '../services/super-admin.service';

// Dashboard
export async function getDashboardStatsHandler(req: AuthRequest, res: Response): Promise<void> {
  try {
    const stats = await getSuperAdminDashboardStats();
    res.json({ success: true, data: stats });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// School Management
export async function listAllSchoolsHandler(req: AuthRequest, res: Response): Promise<void> {
  try {
    const schools = await listAllSchools();
    res.json({ success: true, data: schools });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function getSchoolDetailsHandler(req: AuthRequest, res: Response): Promise<void> {
  try {
    if (!req.params.id) {
      res.status(400).json({ success: false, message: 'School ID is required' });
      return;
    }
    const school = await getSchoolDetails(req.params.id);
    res.json({ success: true, data: school });
  } catch (error: any) {
    if (error.message === 'School not found') {
      res.status(404).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export async function updateSchoolHandler(req: AuthRequest, res: Response): Promise<void> {
  try {
    if (!req.params.id) {
      res.status(400).json({ success: false, message: 'School ID is required' });
      return;
    }
    const updated = await updateSchool(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ success: false, message: 'School not found' });
      return;
    }
    res.json({ success: true, data: updated });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export async function deleteSchoolHandler(req: AuthRequest, res: Response): Promise<void> {
  try {
    if (!req.params.id) {
      res.status(400).json({ success: false, message: 'School ID is required' });
      return;
    }
    const deleted = await deleteSchool(req.params.id);
    if (!deleted) {
      res.status(404).json({ success: false, message: 'School not found' });
      return;
    }
    res.json({ success: true, message: 'School deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// Student Management
export async function getAllStudentsHandler(req: AuthRequest, res: Response): Promise<void> {
  try {
    const students = await getAllStudents();
    res.json({ success: true, data: students });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function getSchoolStudentsHandler(req: AuthRequest, res: Response): Promise<void> {
  try {
    if (!req.params.schoolId) {
      res.status(400).json({ success: false, message: 'School ID is required' });
      return;
    }
    const students = await getSchoolStudents(req.params.schoolId, req.query);
    res.json({ success: true, data: students });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function createSchoolStudentHandler(req: AuthRequest, res: Response): Promise<void> {
  try {
    if (!req.params.schoolId) {
      res.status(400).json({ success: false, message: 'School ID is required' });
      return;
    }
    const student = await createSchoolStudent(req.params.schoolId, req.body);
    const studentData = student.toObject() as any;
    delete studentData.password;
    res.status(201).json({ success: true, data: studentData });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export async function updateStudentHandler(req: AuthRequest, res: Response): Promise<void> {
  try {
    if (!req.params.id) {
      res.status(400).json({ success: false, message: 'Student ID is required' });
      return;
    }
    const updated = await updateAnyStudent(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ success: false, message: 'Student not found' });
      return;
    }
    res.json({ success: true, data: updated });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export async function deleteStudentHandler(req: AuthRequest, res: Response): Promise<void> {
  try {
    if (!req.params.id) {
      res.status(400).json({ success: false, message: 'Student ID is required' });
      return;
    }
    const deleted = await deleteAnyStudent(req.params.id);
    if (!deleted) {
      res.status(404).json({ success: false, message: 'Student not found' });
      return;
    }
    res.json({ success: true, message: 'Student deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// Teacher Management
export async function getAllTeachersHandler(req: AuthRequest, res: Response): Promise<void> {
  try {
    const teachers = await getAllTeachers();
    res.json({ success: true, data: teachers });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function getSchoolTeachersHandler(req: AuthRequest, res: Response): Promise<void> {
  try {
    if (!req.params.schoolId) {
      res.status(400).json({ success: false, message: 'School ID is required' });
      return;
    }
    const teachers = await getSchoolTeachers(req.params.schoolId, req.query);
    res.json({ success: true, data: teachers });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function createSchoolTeacherHandler(req: AuthRequest, res: Response): Promise<void> {
  try {
    if (!req.params.schoolId) {
      res.status(400).json({ success: false, message: 'School ID is required' });
      return;
    }
    const teacher = await createSchoolTeacher(req.params.schoolId, req.body);
    const teacherData = teacher.toObject() as any;
    delete teacherData.password;
    res.status(201).json({ success: true, data: teacherData });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export async function updateTeacherHandler(req: AuthRequest, res: Response): Promise<void> {
  try {
    if (!req.params.id) {
      res.status(400).json({ success: false, message: 'Teacher ID is required' });
      return;
    }
    const updated = await updateAnyTeacher(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ success: false, message: 'Teacher not found' });
      return;
    }
    res.json({ success: true, data: updated });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export async function deleteTeacherHandler(req: AuthRequest, res: Response): Promise<void> {
  try {
    if (!req.params.id) {
      res.status(400).json({ success: false, message: 'Teacher ID is required' });
      return;
    }
    const deleted = await deleteAnyTeacher(req.params.id);
    if (!deleted) {
      res.status(404).json({ success: false, message: 'Teacher not found' });
      return;
    }
    res.json({ success: true, message: 'Teacher deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// Resource Management
export async function getSchoolClassesHandler(req: AuthRequest, res: Response): Promise<void> {
  try {
    if (!req.params.schoolId) {
      res.status(400).json({ success: false, message: 'School ID is required' });
      return;
    }
    const classes = await getSchoolClasses(req.params.schoolId);
    res.json({ success: true, data: classes });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function getSchoolAttendanceHandler(req: AuthRequest, res: Response): Promise<void> {
  try {
    if (!req.params.schoolId) {
      res.status(400).json({ success: false, message: 'School ID is required' });
      return;
    }
    const attendance = await getSchoolAttendance(req.params.schoolId, req.query);
    res.json({ success: true, data: attendance });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function getSchoolExamsHandler(req: AuthRequest, res: Response): Promise<void> {
  try {
    if (!req.params.schoolId) {
      res.status(400).json({ success: false, message: 'School ID is required' });
      return;
    }
    const exams = await getSchoolExams(req.params.schoolId);
    res.json({ success: true, data: exams });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function getSchoolFeesHandler(req: AuthRequest, res: Response): Promise<void> {
  try {
    if (!req.params.schoolId) {
      res.status(400).json({ success: false, message: 'School ID is required' });
      return;
    }
    const fees = await getSchoolFees(req.params.schoolId);
    res.json({ success: true, data: fees });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function getSchoolHomeworkHandler(req: AuthRequest, res: Response): Promise<void> {
  try {
    if (!req.params.schoolId) {
      res.status(400).json({ success: false, message: 'School ID is required' });
      return;
    }
    const homework = await getSchoolHomework(req.params.schoolId);
    res.json({ success: true, data: homework });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function getSchoolNoticesHandler(req: AuthRequest, res: Response): Promise<void> {
  try {
    if (!req.params.schoolId) {
      res.status(400).json({ success: false, message: 'School ID is required' });
      return;
    }
    const notices = await getSchoolNotices(req.params.schoolId);
    res.json({ success: true, data: notices });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function getSchoolTimetablesHandler(req: AuthRequest, res: Response): Promise<void> {
  try {
    if (!req.params.schoolId) {
      res.status(400).json({ success: false, message: 'School ID is required' });
      return;
    }
    const timetables = await getSchoolTimetables(req.params.schoolId);
    res.json({ success: true, data: timetables });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function getSchoolMedicalRecordsHandler(req: AuthRequest, res: Response): Promise<void> {
  try {
    if (!req.params.schoolId) {
      res.status(400).json({ success: false, message: 'School ID is required' });
      return;
    }
    const records = await getSchoolMedicalRecords(req.params.schoolId);
    res.json({ success: true, data: records });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}
