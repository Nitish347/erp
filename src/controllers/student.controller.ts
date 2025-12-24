import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import {
  createStudent,
  deleteStudent,
  getStudentById,
  listStudents,
  updateStudent,
} from '../services/student.service';

export async function createStudentHandler(req: AuthRequest, res: Response): Promise<void> {
  try {
    // Only admins and institutes can create students
    if (!req.user || req.user.role !== 'admin') {
      res.status(403).json({ success: false, message: 'Only admins and institutes can create students' });
      return;
    }
    // If admin, automatically set the institute field
    if (req.user.role === 'admin') {
      req.body.institute = req.user.id;
    }
    const student = await createStudent(req.body);
    const studentData = student.toObject();
    delete studentData.password;
    res.status(201).json({ success: true, data: studentData });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export async function listStudentsHandler(req: AuthRequest, res: Response): Promise<void> {
  try {
    // If admin, only show their students
    if (req.user?.role === 'admin') {
      const students = await listStudents({ institute: req.user.id });
      res.json({ success: true, data: students });
      return;
    }
    // If teacher, only show their students
    if (req.user?.role === 'teacher') {
      const students = await listStudents({ teacher: req.user.id });
      res.json({ success: true, data: students });
      return;
    }
    // Admin and others can see all
    const students = await listStudents();
    res.json({ success: true, data: students });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function getStudentByIdHandler(req: AuthRequest, res: Response): Promise<void> {
  try {
    const student = await getStudentById(req.params.id!);
    if (!student) {
      res.status(404).json({ success: false, message: 'Student not found' });
      return;
    }
    // If admin, verify ownership
    if (req.user?.role === 'admin' && student.institute?.toString() !== req.user.id) {
      res.status(403).json({ success: false, message: 'You can only view your own students' });
      return;
    }
    // If teacher, verify ownership
    if (req.user?.role === 'teacher' && student.teacher?.toString() !== req.user.id) {
      res.status(403).json({ success: false, message: 'You can only view your own students' });
      return;
    }
    res.json({ success: true, data: student });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function updateStudentHandler(req: AuthRequest, res: Response): Promise<void> {
  try {
    // Only admins and institutes can update students
    if (!req.user || req.user.role !== 'admin') {
      res.status(403).json({ success: false, message: 'Only admins can update students' });
      return;
    }
    // If admin, verify ownership
    if (req.user.role === 'admin') {
      const student = await getStudentById(req.params.id!);
      if (!student || student.institute?.toString() !== req.user.id) {
        res.status(403).json({ success: false, message: 'You can only update your own students' });
        return;
      }
    }

    const updated = await updateStudent(req.params.id!, req.body);
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
    // Only admins and institutes can delete students
    if (!req.user || req.user.role !== 'admin') {
      res.status(403).json({ success: false, message: 'Only admins can delete students' });
      return;
    }
    // If admin, verify ownership
    if (req.user.role === 'admin') {
      const student = await getStudentById(req.params.id!);
      if (!student || student.institute?.toString() !== req.user.id) {
        res.status(403).json({ success: false, message: 'You can only delete your own students' });
        return;
      }
    }

    const deleted = await deleteStudent(req.params.id!);
    if (!deleted) {
      res.status(404).json({ success: false, message: 'Student not found' });
      return;
    }
    res.json({ success: true, message: 'Student deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}


