import { Request, Response } from 'express';
import {
  markAttendance,
  deleteAttendance,
  getAttendanceById,
  getAllAttendance,
  getAttendanceByTeacher,
  getAttendanceByStudent,
  updateAttendance,
  getAttendanceStats,
  getDailyAttendance,
  bulkMarkAttendance
} from '../services/attendance.service';

export async function markAttendanceHandler(req: Request, res: Response): Promise<void> {
  try {
    const attendance = await markAttendance(req.body);
    res.status(201).json({ success: true, data: attendance });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export async function getAllAttendanceHandler(req: Request, res: Response): Promise<void> {
  try {
    const filters: {
      teacherId?: string;
      studentId?: string;
      startDate?: Date;
      endDate?: Date;
      status?: string;
      subject?: string;
      class?: string;
      section?: string;
    } = {};

    if (req.query.teacherId) filters.teacherId = req.query.teacherId as string;
    if (req.query.studentId) filters.studentId = req.query.studentId as string;
    if (req.query.startDate) filters.startDate = new Date(req.query.startDate as string);
    if (req.query.endDate) filters.endDate = new Date(req.query.endDate as string);
    if (req.query.status) filters.status = req.query.status as string;
    if (req.query.subject) filters.subject = req.query.subject as string;
    if (req.query.class) filters.class = req.query.class as string;
    if (req.query.section) filters.section = req.query.section as string;

    const attendance = await getAllAttendance(filters);
    res.json({ success: true, data: attendance });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export async function getAttendanceByIdHandler(req: Request, res: Response): Promise<void> {
  try {
    const attendance = await getAttendanceById(req.params.id!);
    if (!attendance) {
      res.status(404).json({ success: false, message: 'Attendance record not found' });
      return;
    }
    res.json({ success: true, data: attendance });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export async function getAttendanceByTeacherHandler(req: Request, res: Response): Promise<void> {
  try {
    const { teacherId } = req.params;
    const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined;
    const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined;
    
    if (!teacherId) {
      res.status(400).json({ success: false, message: 'Teacher ID is required' });
      return;
    }
    
    const attendance = await getAttendanceByTeacher(teacherId, startDate, endDate);
    res.json({ success: true, data: attendance });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export async function getAttendanceByStudentHandler(req: Request, res: Response): Promise<void> {
  try {
    const { studentId } = req.params;
    const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined;
    const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined;
    
    if (!studentId) {
      res.status(400).json({ success: false, message: 'Student ID is required' });
      return;
    }
    
    const attendance = await getAttendanceByStudent(studentId, startDate, endDate);
    res.json({ success: true, data: attendance });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export async function updateAttendanceHandler(req: Request, res: Response): Promise<void> {
  try {
    if (!req.params.id) {
      res.status(400).json({ success: false, message: 'Attendance ID is required' });
      return;
    }
    
    const updated = await updateAttendance(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ success: false, message: 'Attendance record not found' });
      return;
    }
    res.json({ success: true, data: updated });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export async function deleteAttendanceHandler(req: Request, res: Response): Promise<void> {
  try {
    if (!req.params.id) {
      res.status(400).json({ success: false, message: 'Attendance ID is required' });
      return;
    }
    
    const deleted = await deleteAttendance(req.params.id);
    if (!deleted) {
      res.status(404).json({ success: false, message: 'Attendance record not found' });
      return;
    }
    res.json({ success: true, message: 'Attendance record deleted successfully' });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export async function getAttendanceStatsHandler(req: Request, res: Response): Promise<void> {
  try {
    const teacherId = req.query.teacherId as string;
    const studentId = req.query.studentId as string;
    const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined;
    const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined;

    const stats = await getAttendanceStats(teacherId, studentId, startDate, endDate);
    res.json({ success: true, data: stats });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export async function getDailyAttendanceHandler(req: Request, res: Response): Promise<void> {
  try {
    const { date } = req.params;
    
    if (!date) {
      res.status(400).json({ success: false, message: 'Date is required' });
      return;
    }
    
    const teacherId = req.query.teacherId as string | undefined;
    const classFilter = req.query.class as string | undefined;
    const section = req.query.section as string | undefined;

    const attendanceDate = new Date(date);
    const attendance = await getDailyAttendance(attendanceDate, teacherId, classFilter, section);
    res.json({ success: true, data: attendance });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export async function bulkMarkAttendanceHandler(req: Request, res: Response): Promise<void> {
  try {
    const { attendanceData } = req.body;
    
    if (!Array.isArray(attendanceData)) {
      res.status(400).json({ 
        success: false, 
        message: 'attendanceData must be an array' 
      });
      return;
    }

    const results = await bulkMarkAttendance(attendanceData);
    res.json({ success: true, data: results });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
}
