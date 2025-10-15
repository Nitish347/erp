import { FilterQuery, UpdateQuery } from 'mongoose';
import { Student, StudentModel } from '../models/Student.model';

export async function createStudent(data: Partial<Student>): Promise<Student> {
  const created = await StudentModel.create(data);
  return created;
}

export async function listStudents(filter: FilterQuery<Student> = {}): Promise<Student[]> {
  return StudentModel.find(filter).lean<Student[]>();
}

export async function getStudentById(id: string): Promise<Student | null> {
  return StudentModel.findById(id).lean<Student | null>();
}

export async function updateStudent(id: string, updates: UpdateQuery<Student>): Promise<Student | null> {
  return StudentModel.findByIdAndUpdate(id, updates, { new: true }).lean<Student | null>();
}

export async function deleteStudent(id: string): Promise<Student | null> {
  return StudentModel.findByIdAndDelete(id).lean<Student | null>();
}


