import { Request, Response } from 'express';
import {
  createStudent,
  deleteStudent,
  getStudentById,
  listStudents,
  updateStudent,
} from '../services/student.service';

export async function createStudentHandler(req: Request, res: Response): Promise<void> {
  const student = await createStudent(req.body);
  res.status(201).json({ success: true, data: student });
}

export async function listStudentsHandler(_req: Request, res: Response): Promise<void> {
  const students = await listStudents();
  res.json({ success: true, data: students });
}

export async function getStudentByIdHandler(req: Request, res: Response): Promise<void> {
  const student = await getStudentById(req.params.id!);
  if (!student) {
    res.status(404).json({ success: false, message: 'Student not found' });
    return;
  }
  res.json({ success: true, data: student });
}

export async function updateStudentHandler(req: Request, res: Response): Promise<void> {
  const updated = await updateStudent(req.params.id!, req.body);
  if (!updated) {
    res.status(404).json({ success: false, message: 'Student not found' });
    return;
  }
  res.json({ success: true, data: updated });
}

export async function deleteStudentHandler(req: Request, res: Response): Promise<void> {
  const deleted = await deleteStudent(req.params.id!);
  if (!deleted) {
    res.status(404).json({ success: false, message: 'Student not found' });
    return;
  }
  res.json({ success: true });
}


