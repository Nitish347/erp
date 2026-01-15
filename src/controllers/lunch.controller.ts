import { Request, Response } from 'express';
import {
  markLunch,
  deleteLunch,
  getLunchById,
  getAllLunch,
  getLunchByTeacher,
  getLunchByStudent,
  updateLunch,
  getLunchStats,
  getDailyLunch,
  bulkMarkLunch
} from '../services/lunch.service';

export async function markLunchHandler(req: Request, res: Response): Promise<void> {
  try {
    const lunch = await markLunch(req.body);
    res.status(201).json({ success: true, data: lunch });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export async function getAllLunchHandler(req: Request, res: Response): Promise<void> {
  try {
    const filters: {
      teacherId?: string;
      studentId?: string;
      startDate?: Date;
      endDate?: Date;
      status?: string;
      class?: string;
      section?: string;
    } = {};

    if (req.query.teacherId) filters.teacherId = req.query.teacherId as string;
    if (req.query.studentId) filters.studentId = req.query.studentId as string;
    if (req.query.startDate) filters.startDate = new Date(req.query.startDate as string);
    if (req.query.endDate) filters.endDate = new Date(req.query.endDate as string);
    if (req.query.status) filters.status = req.query.status as string;
    if (req.query.class) filters.class = req.query.class as string;
    if (req.query.section) filters.section = req.query.section as string;

    const lunch = await getAllLunch(filters);
    res.json({ success: true, data: lunch });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export async function getLunchByIdHandler(req: Request, res: Response): Promise<void> {
  try {
    const lunch = await getLunchById(req.params.id!);
    if (!lunch) {
      res.status(404).json({ success: false, message: 'Lunch record not found' });
      return;
    }
    res.json({ success: true, data: lunch });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export async function getLunchByTeacherHandler(req: Request, res: Response): Promise<void> {
  try {
    const { teacherId } = req.params;
    const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined;
    const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined;
    
    if (!teacherId) {
      res.status(400).json({ success: false, message: 'Teacher ID is required' });
      return;
    }
    
    const lunch = await getLunchByTeacher(teacherId, startDate, endDate);
    res.json({ success: true, data: lunch });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export async function getLunchByStudentHandler(req: Request, res: Response): Promise<void> {
  try {
    const { studentId } = req.params;
    const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined;
    const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined;
    
    if (!studentId) {
      res.status(400).json({ success: false, message: 'Student ID is required' });
      return;
    }
    
    const lunch = await getLunchByStudent(studentId, startDate, endDate);
    res.json({ success: true, data: lunch });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export async function updateLunchHandler(req: Request, res: Response): Promise<void> {
  try {
    if (!req.params.id) {
      res.status(400).json({ success: false, message: 'Lunch ID is required' });
      return;
    }
    
    const updated = await updateLunch(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ success: false, message: 'Lunch record not found' });
      return;
    }
    res.json({ success: true, data: updated });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export async function deleteLunchHandler(req: Request, res: Response): Promise<void> {
  try {
    if (!req.params.id) {
      res.status(400).json({ success: false, message: 'Lunch ID is required' });
      return;
    }
    
    const deleted = await deleteLunch(req.params.id);
    if (!deleted) {
      res.status(404).json({ success: false, message: 'Lunch record not found' });
      return;
    }
    res.json({ success: true, message: 'Lunch record deleted successfully' });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export async function getLunchStatsHandler(req: Request, res: Response): Promise<void> {
  try {
    const teacherId = req.query.teacherId as string | undefined;
    const studentId = req.query.studentId as string | undefined;
    const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined;
    const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined;

    const stats = await getLunchStats(teacherId, studentId, startDate, endDate);
    res.json({ success: true, data: stats });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export async function getDailyLunchHandler(req: Request, res: Response): Promise<void> {
  try {
    const { date } = req.params;
    
    if (!date) {
      res.status(400).json({ success: false, message: 'Date is required' });
      return;
    }
    
    const teacherId = req.query.teacherId as string | undefined;
    const classFilter = req.query.class as string | undefined;
    const section = req.query.section as string | undefined;

    const lunchDate = new Date(date);
    const lunch = await getDailyLunch(lunchDate, teacherId, classFilter, section);
    res.json({ success: true, data: lunch });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export async function bulkMarkLunchHandler(req: Request, res: Response): Promise<void> {
  try {
    const { lunchData } = req.body;
    
    if (!Array.isArray(lunchData)) {
      res.status(400).json({ 
        success: false, 
        message: 'lunchData must be an array' 
      });
      return;
    }

    const results = await bulkMarkLunch(lunchData);
    res.json({ success: true, data: results });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
}
