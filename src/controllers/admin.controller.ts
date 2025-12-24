import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import {
  createAdmin,
  deleteAdmin,
  getAdminById,
  listAdmins,
  updateAdmin,
  getAllTeachersForAdmin,
  getAllStudentsForAdmin,
} from '../services/admin.service';

export async function createAdminHandler(req: AuthRequest, res: Response): Promise<void> {
  try {
    const admin = await createAdmin(req.body);
    const adminData = admin.toObject();
    delete adminData.password;
    res.status(201).json({ success: true, data: adminData });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export async function listAdminsHandler(_req: AuthRequest, res: Response): Promise<void> {
  try {
    const admins = await listAdmins();
    res.json({ success: true, data: admins });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function getAdminByIdHandler(req: AuthRequest, res: Response): Promise<void> {
  try {
    const admin = await getAdminById(req.params.id!);
    if (!admin) {
      res.status(404).json({ success: false, message: 'Admin not found' });
      return;
    }
    res.json({ success: true, data: admin });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function updateAdminHandler(req: AuthRequest, res: Response): Promise<void> {
  try {
    const updated = await updateAdmin(req.params.id!, req.body);
    if (!updated) {
      res.status(404).json({ success: false, message: 'Admin not found' });
      return;
    }
    res.json({ success: true, data: updated });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export async function deleteAdminHandler(req: AuthRequest, res: Response): Promise<void> {
  try {
    const deleted = await deleteAdmin(req.params.id!);
    if (!deleted) {
      res.status(404).json({ success: false, message: 'Admin not found' });
      return;
    }
    res.json({ success: true, message: 'Admin deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}



// View all teachers and students
export async function getAllTeachersHandler(req: AuthRequest, res: Response): Promise<void> {
  try {
    if (!req.user || req.user.role !== 'admin') {
      res.status(403).json({ success: false, message: 'Only admins can view all teachers' });
      return;
    }
    const teachers = await getAllTeachersForAdmin();
    res.json({ success: true, data: teachers });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function getAllStudentsHandler(req: AuthRequest, res: Response): Promise<void> {
  try {
    if (!req.user || req.user.role !== 'admin') {
      res.status(403).json({ success: false, message: 'Only admins can view all students' });
      return;
    }
    const students = await getAllStudentsForAdmin();
    res.json({ success: true, data: students });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}

