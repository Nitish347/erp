import { AttendanceModel } from '../models/Attendance.model';
import { TeacherModel } from '../models/Teacher.model';
import { StudentModel } from '../models/Student.model';
import { AdminModel } from '../models/Admin.model';

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

export const markAttendance = async (data: CreateAttendanceData) => {
  // Validate teacher exists
  let teacher: any = await TeacherModel.findById(data.teacherId);
  if (!teacher) {
    // Check if it is an Admin (Institution) instead
    teacher = await AdminModel.findById(data.teacherId);
    if (!teacher) {
      throw new Error('Teacher or Institution not found');
    }
  }

  // Validate student exists if provided
  if (data.studentId) {
    const student = await StudentModel.findById(data.studentId);
    if (!student) {
      throw new Error('Student not found');
    }
  }

  // Check if attendance already exists for this teacher/student on this date
  const existingAttendance = await AttendanceModel.findOne({
    teacherId: data.teacherId,
    studentId: data.studentId || null,
    date: {
      $gte: new Date(data.date || new Date()).setHours(0, 0, 0, 0),
      $lt: new Date(data.date || new Date()).setHours(23, 59, 59, 999)
    }
  });

  if (existingAttendance) {
    // Update existing attendance
    return await AttendanceModel.findByIdAndUpdate(
      existingAttendance._id,
      {
        ...data,
        markedAt: new Date(),
        updatedAt: new Date()
      },
      { new: true }
    ).populate('teacherId', 'firstName lastName email department')
      .populate('studentId', 'firstName lastName email enrollmentNumber class section');
  }

  // Create new attendance record
  const attendance = new AttendanceModel({
    ...data,
    date: data.date || new Date(),
    markedAt: new Date()
  });

  return await attendance.save();
};

export const getAttendanceByTeacher = async (teacherId: string, startDate?: Date, endDate?: Date) => {
  const query: any = { teacherId };

  if (startDate && endDate) {
    query.date = {
      $gte: startDate,
      $lte: endDate
    };
  }

  return await AttendanceModel.find(query)
    .populate('teacherId', 'firstName lastName email department')
    .populate('studentId', 'firstName lastName email enrollmentNumber class section')
    .sort({ date: -1, createdAt: -1 });
};

export const getAttendanceByStudent = async (studentId: string, startDate?: Date, endDate?: Date) => {
  const query: any = { studentId };

  if (startDate && endDate) {
    query.date = {
      $gte: startDate,
      $lte: endDate
    };
  }

  return await AttendanceModel.find(query)
    .populate('teacherId', 'firstName lastName email department')
    .populate('studentId', 'firstName lastName email enrollmentNumber class section')
    .sort({ date: -1, createdAt: -1 });
};

export const getAllAttendance = async (filters: {
  teacherId?: string;
  studentId?: string;
  startDate?: Date;
  endDate?: Date;
  status?: string;
  subject?: string;
  class?: string;
  section?: string;
}) => {
  const query: any = {};

  if (filters.teacherId) query.teacherId = filters.teacherId;
  if (filters.studentId) query.studentId = filters.studentId;
  if (filters.status) query.status = filters.status;
  if (filters.subject) query.subject = new RegExp(filters.subject, 'i');
  if (filters.class) query.class = filters.class;
  if (filters.section) query.section = filters.section;

  if (filters.startDate && filters.endDate) {
    query.date = {
      $gte: filters.startDate,
      $lte: filters.endDate
    };
  }

  return await AttendanceModel.find(query)
    .populate('teacherId', 'firstName lastName email department')
    .populate('studentId', 'firstName lastName email enrollmentNumber class section')
    .sort({ date: -1, createdAt: -1 });
};

export const getAttendanceById = async (id: string) => {
  return await AttendanceModel.findById(id)
    .populate('teacherId', 'firstName lastName email department')
    .populate('studentId', 'firstName lastName email enrollmentNumber class section');
};

export const updateAttendance = async (id: string, data: Partial<CreateAttendanceData>) => {
  return await AttendanceModel.findByIdAndUpdate(
    id,
    {
      ...data,
      markedAt: new Date(),
      updatedAt: new Date()
    },
    { new: true }
  ).populate('teacherId', 'firstName lastName email department')
    .populate('studentId', 'firstName lastName email enrollmentNumber class section');
};

export const deleteAttendance = async (id: string) => {
  return await AttendanceModel.findByIdAndDelete(id);
};

export const getAttendanceStats = async (teacherId?: string, studentId?: string, startDate?: Date, endDate?: Date): Promise<AttendanceStats> => {
  const query: any = {};

  if (teacherId) query.teacherId = teacherId;
  if (studentId) query.studentId = studentId;

  if (startDate && endDate) {
    query.date = {
      $gte: startDate,
      $lte: endDate
    };
  }

  const attendanceRecords = await AttendanceModel.find(query);

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

export const getDailyAttendance = async (date: Date, teacherId?: string, className?: string, section?: string) => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const query: any = {
    date: {
      $gte: startOfDay,
      $lte: endOfDay
    }
  };

  if (teacherId) query.teacherId = teacherId;
  if (className) query.class = className;
  if (section) query.section = section;

  return await AttendanceModel.find(query)
    .populate('teacherId', 'firstName lastName email department')
    .populate('studentId', 'firstName lastName email enrollmentNumber class section')
    .sort({ createdAt: 1 });
};

export const bulkMarkAttendance = async (attendanceData: CreateAttendanceData[]) => {
  const results = [];

  for (const data of attendanceData) {
    try {
      const result = await markAttendance(data);
      results.push({ success: true, data: result });
    } catch (error: any) {
      results.push({ success: false, error: error.message, data });
    }
  }

  return results;
};
