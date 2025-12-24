import { FilterQuery, UpdateQuery } from 'mongoose';
import { Admin, AdminModel } from '../models/Admin.model';
import { TeacherModel } from '../models/Teacher.model';
import { StudentModel } from '../models/Student.model';

export async function createAdmin(data: Partial<Admin>): Promise<Admin> {
  const created = await AdminModel.create(data);
  return created;
}

export async function listAdmins(filter: FilterQuery<Admin> = {}): Promise<Admin[]> {
  return AdminModel.find({ ...filter, isActive: true })
    .select('-password')
    .lean<Admin[]>();
}

export async function getAdminById(id: string): Promise<Admin | null> {
  return AdminModel.findById(id).select('-password').lean<Admin | null>();
}

export async function updateAdmin(id: string, updates: UpdateQuery<Admin>): Promise<Admin | null> {
  return AdminModel.findByIdAndUpdate(id, updates, { new: true })
    .select('-password')
    .lean<Admin | null>();
}

export async function deleteAdmin(id: string): Promise<Admin | null> {
  // Soft delete - set isActive to false
  return AdminModel.findByIdAndUpdate(
    id,
    { isActive: false, updatedAt: new Date() },
    { new: true }
  )
    .select('-password')
    .lean<Admin | null>();
}

// Institute management wrappers
export async function createInstituteByAdmin(adminId: string, data: Partial<Admin>): Promise<Admin> {
  return createAdmin(data);
}

export async function listInstitutesByAdmin(adminId: string): Promise<Admin[]> {
  return listAdmins();
}

export async function getInstituteByAdmin(adminId: string, instituteId: string): Promise<Admin | null> {
  return getAdminById(instituteId);
}

export async function updateInstituteByAdmin(adminId: string, instituteId: string, updates: UpdateQuery<Admin>): Promise<Admin | null> {
  return updateAdmin(instituteId, updates);
}

export async function deleteInstituteByAdmin(adminId: string, instituteId: string): Promise<Admin | null> {
  return deleteAdmin(instituteId);
}

// Admin can view all teachers and students
export async function getAllTeachersForAdmin() {
  return await TeacherModel.find().select('-password').populate('institute', 'name email');
}

export async function getAllStudentsForAdmin() {
  return await StudentModel.find().select('-password').populate('institute', 'name email').populate('teacher', 'firstName lastName email');
}

