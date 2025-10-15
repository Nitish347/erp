import { Request, Response } from 'express';
import {
  createTeacher,
  deleteTeacher,
  getTeacherById,
  listTeachers,
  updateTeacher,
} from '../services/teacher.service';

export async function createTeacherHandler(req: Request, res: Response): Promise<void> {
  const teacher = await createTeacher(req.body);
  res.status(201).json({ success: true, data: teacher });
}

export async function listTeachersHandler(_req: Request, res: Response): Promise<void> {
  const teachers = await listTeachers();
  res.json({ success: true, data: teachers });
}

export async function getTeacherByIdHandler(req: Request, res: Response): Promise<void> {
  const teacher = await getTeacherById(req.params.id);
  if (!teacher) {
    res.status(404).json({ success: false, message: 'Teacher not found' });
    return;
  }
  res.json({ success: true, data: teacher });
}

export async function updateTeacherHandler(req: Request, res: Response): Promise<void> {
  const updated = await updateTeacher(req.params.id, req.body);
  if (!updated) {
    res.status(404).json({ success: false, message: 'Teacher not found' });
    return;
  }
  res.json({ success: true, data: updated });
}

export async function deleteTeacherHandler(req: Request, res: Response): Promise<void> {
  const deleted = await deleteTeacher(req.params.id);
  if (!deleted) {
    res.status(404).json({ success: false, message: 'Teacher not found' });
    return;
  }
  res.json({ success: true });
}


