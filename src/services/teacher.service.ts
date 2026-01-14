import { FilterQuery, UpdateQuery } from 'mongoose';
import { ITeacher, TeacherModel } from '../models/Teacher.model';
import { StudentModel } from '../models/Student.model';

export async function createTeacher(data: Partial<ITeacher>): Promise<ITeacher> {
  const created = await TeacherModel.create(data);
  return created;
}

export async function listTeachers(filter: FilterQuery<ITeacher> = {}): Promise<ITeacher[]> {
  return TeacherModel.find(filter).lean<ITeacher[]>();
}

export async function getTeacherById(id: string): Promise<ITeacher | null> {
  return TeacherModel.findById(id).lean<ITeacher | null>();
}

export async function updateTeacher(id: string, updates: UpdateQuery<ITeacher>): Promise<ITeacher | null> {
  return TeacherModel.findByIdAndUpdate(id, updates, { new: true }).lean<ITeacher | null>();
}

export async function deleteTeacher(id: string): Promise<ITeacher | null> {
  return TeacherModel.findByIdAndDelete(id).lean<ITeacher | null>();
}

// Teacher-specific operations - can only manage students assigned to them
export async function createStudentByTeacher(teacherId: string, data: any) {
  const teacher = await TeacherModel.findById(teacherId);
  if (!teacher) {
    throw new Error('Teacher not found');
  }
  const student = new StudentModel({ ...data, teacher: teacherId });
  return await student.save();
}

export async function listStudentsByTeacher(teacherId: string) {
  return await StudentModel.find({ teacher: teacherId }).select('-password');
}

export async function getStudentByTeacher(teacherId: string, studentId: string) {
  return await StudentModel.findOne({ _id: studentId, teacher: teacherId }).select('-password');
}

export async function updateStudentByTeacher(teacherId: string, studentId: string, data: any) {
  return await StudentModel.findOneAndUpdate(
    { _id: studentId, teacher: teacherId },
    { ...data, updatedAt: new Date() },
    { new: true }
  ).select('-password');
}

export async function deleteStudentByTeacher(teacherId: string, studentId: string) {
  return await StudentModel.findOneAndDelete({ _id: studentId, teacher: teacherId });
}


