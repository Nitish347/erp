import { Request, Response } from 'express';
import {
  createTimetable,
  deleteTimetable,
  getTimetableById,
  getAllTimetables,
  getTimetableByTeacher,
  getTimetableByStudent,
  updateTimetable,
  getTimetableConflicts
} from '../services/timetable.service';

export async function createTimetableHandler(req: Request, res: Response): Promise<void> {
  try {
    const timetable = await createTimetable(req.body);
    res.status(201).json({ success: true, data: timetable });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export async function getAllTimetablesHandler(req: Request, res: Response): Promise<void> {
  try {
    const filters = {
      teacherId: req.query.teacherId as string,
      studentId: req.query.studentId as string,
      dayOfWeek: req.query.dayOfWeek as string,
      subject: req.query.subject as string,
      class: req.query.class as string,
      section: req.query.section as string
    };

    const timetables = await getAllTimetables(filters);
    res.json({ success: true, data: timetables });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export async function getTimetableByIdHandler(req: Request, res: Response): Promise<void> {
  try {
    const timetable = await getTimetableById(req.params.id!);
    if (!timetable) {
      res.status(404).json({ success: false, message: 'Timetable not found' });
      return;
    }
    res.json({ success: true, data: timetable });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export async function getTimetableByTeacherHandler(req: Request, res: Response): Promise<void> {
  try {
    const { teacherId } = req.params;
    const { dayOfWeek } = req.query;
    
    const timetables = await getTimetableByTeacher(teacherId!, dayOfWeek as string);
    res.json({ success: true, data: timetables });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export async function getTimetableByStudentHandler(req: Request, res: Response): Promise<void> {
  try {
    const { studentId } = req.params;
    const { dayOfWeek } = req.query;
    
    const timetables = await getTimetableByStudent(studentId!, dayOfWeek as string);
    res.json({ success: true, data: timetables });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export async function updateTimetableHandler(req: Request, res: Response): Promise<void> {
  try {
    const updated = await updateTimetable(req.params.id!, req.body);
    if (!updated) {
      res.status(404).json({ success: false, message: 'Timetable not found' });
      return;
    }
    res.json({ success: true, data: updated });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export async function deleteTimetableHandler(req: Request, res: Response): Promise<void> {
  try {
    const deleted = await deleteTimetable(req.params.id!);
    if (!deleted) {
      res.status(404).json({ success: false, message: 'Timetable not found' });
      return;
    }
    res.json({ success: true, message: 'Timetable deleted successfully' });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export async function getTimetableConflictsHandler(req: Request, res: Response): Promise<void> {
  try {
    const { teacherId, dayOfWeek, startTime, endTime, excludeId } = req.query;
    
    if (!teacherId || !dayOfWeek || !startTime || !endTime) {
      res.status(400).json({ 
        success: false, 
        message: 'teacherId, dayOfWeek, startTime, and endTime are required' 
      });
      return;
    }

    const conflicts = await getTimetableConflicts(
      teacherId as string,
      dayOfWeek as string,
      startTime as string,
      endTime as string,
      excludeId as string
    );
    
    res.json({ success: true, data: conflicts });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
}
