import { FilterQuery, UpdateQuery } from 'mongoose';
import { Teacher, TeacherModel } from '../models/Teacher.model';

export async function createTeacher(data: Partial<Teacher>): Promise<Teacher> {
  const created = await TeacherModel.create(data);
  return created;
}

export async function listTeachers(filter: FilterQuery<Teacher> = {}): Promise<Teacher[]> {
  return TeacherModel.find(filter).lean<Teacher[]>();
}

export async function getTeacherById(id: string): Promise<Teacher | null> {
  return TeacherModel.findById(id).lean<Teacher | null>();
}

export async function updateTeacher(id: string, updates: UpdateQuery<Teacher>): Promise<Teacher | null> {
  return TeacherModel.findByIdAndUpdate(id, updates, { new: true }).lean<Teacher | null>();
}

export async function deleteTeacher(id: string): Promise<Teacher | null> {
  return TeacherModel.findByIdAndDelete(id).lean<Teacher | null>();
}


