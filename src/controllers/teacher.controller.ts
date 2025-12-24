import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import {
  createTeacher,
  deleteTeacher,
  getTeacherById,
  listTeachers,
  updateTeacher,
  listStudentsByTeacher,
  getStudentByTeacher,
} from '../services/teacher.service';
import { TeacherModel } from '../models/Teacher.model';

export async function createTeacherHandler(req: AuthRequest, res: Response): Promise<void> {
  try {
    // Only admins and institutes can create teachers
    if (!req.user || req.user.role !== 'admin') {
      res.status(403).json({ success: false, message: 'Only admins can create teachers' });
      return;
    }
    // If admin, automatically set the institute field
    if (req.user.role === 'admin') {
      req.body.institute = req.user.id;
    }
    const teacher = await createTeacher(req.body);
    const teacherData = teacher.toObject();
    delete teacherData.password;
    res.status(201).json({ success: true, data: teacherData });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export async function listTeachersHandler(req: AuthRequest, res: Response): Promise<void> {
  try {
    // If admin, only show their teachers
    if (req.user?.role === 'admin') {
      const teachers = await listTeachers({ institute: req.user.id });
      res.json({ success: true, data: teachers });
      return;
    }
    // Admin and others can see all
    const teachers = await listTeachers();
    res.json({ success: true, data: teachers });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function getTeacherByIdHandler(req: AuthRequest, res: Response): Promise<void> {
  try {
    const teacher = await getTeacherById(req.params.id!);
    if (!teacher) {
      res.status(404).json({ success: false, message: 'Teacher not found' });
      return;
    }
    // If admin, verify ownership
    if (req.user?.role === 'admin' && teacher.institute?.toString() !== req.user.id) {
      res.status(403).json({ success: false, message: 'You can only view your own teachers' });
      return;
    }
    res.json({ success: true, data: teacher });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function updateTeacherHandler(req: AuthRequest, res: Response): Promise<void> {
  try {
    // Only admins and institutes can update teachers
    if (!req.user || req.user.role !== 'admin') {
      res.status(403).json({ success: false, message: 'Only admins can update teachers' });
      return;
    }
    // If admin, verify ownership
    if (req.user.role === 'admin') {
      const teacher = await getTeacherById(req.params.id!);
      if (!teacher || teacher.institute?.toString() !== req.user.id) {
        res.status(403).json({ success: false, message: 'You can only update your own teachers' });
        return;
      }
    }
    const updated = await updateTeacher(req.params.id!, req.body);
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
    // Only admins and institutes can delete teachers
    if (!req.user || req.user.role !== 'admin') {
      res.status(403).json({ success: false, message: 'Only admins can delete teachers' });
      return;
    }
    // If admin, verify ownership
    if (req.user.role === 'admin') {
      const teacher = await getTeacherById(req.params.id!);
      if (!teacher || teacher.institute?.toString() !== req.user.id) {
        res.status(403).json({ success: false, message: 'You can only delete your own teachers' });
        return;
      }
    }
    const deleted = await deleteTeacher(req.params.id!);
    if (!deleted) {
      res.status(404).json({ success: false, message: 'Teacher not found' });
      return;
    }
    res.json({ success: true, message: 'Teacher deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}



export async function listStudentsByTeacherHandler(req: AuthRequest, res: Response): Promise<void> {
  try {
    if (!req.user || req.user.role !== 'teacher') {
      res.status(403).json({ success: false, message: 'Only teachers can view their students' });
      return;
    }
    const students = await listStudentsByTeacher(req.user.id);
    res.json({ success: true, data: students });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function getStudentByTeacherHandler(req: AuthRequest, res: Response): Promise<void> {
  try {
    if (!req.user || req.user.role !== 'teacher') {
      res.status(403).json({ success: false, message: 'Only teachers can view their students' });
      return;
    }
    const student = await getStudentByTeacher(req.user.id, req.params.id!);
    if (!student) {
      res.status(404).json({ success: false, message: 'Student not found' });
      return;
    }
    res.json({ success: true, data: student });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}






