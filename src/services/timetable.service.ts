import { TimetableModel } from '../models/Timetable.model';
import { TeacherModel } from '../models/Teacher.model';
import { StudentModel } from '../models/Student.model';

export interface CreateTimetableData {
  teacherId: string;
  studentId?: string;
  subject: string;
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  startTime: string;
  endTime: string;
  room?: string;
  class?: string;
  section?: string;
}

export const createTimetable = async (data: CreateTimetableData) => {
  // Validate teacher exists
  const teacher = await TeacherModel.findById(data.teacherId);
  if (!teacher) {
    throw new Error('Teacher not found');
  }

  // Validate student exists if provided
  if (data.studentId) {
    const student = await StudentModel.findById(data.studentId);
    if (!student) {
      throw new Error('Student not found');
    }
  }

  // Check for time conflicts
  const conflict = await TimetableModel.findOne({
    teacherId: data.teacherId,
    dayOfWeek: data.dayOfWeek,
    isActive: true,
    $or: [
      {
        startTime: { $lt: data.endTime },
        endTime: { $gt: data.startTime }
      }
    ]
  });

  if (conflict) {
    throw new Error('Time slot conflicts with existing timetable');
  }

  const timetable = new TimetableModel(data);
  return await timetable.save();
};

export const getTimetableByTeacher = async (teacherId: string, dayOfWeek?: string) => {
  const query: any = { teacherId, isActive: true };
  if (dayOfWeek) {
    query.dayOfWeek = dayOfWeek;
  }
  
  return await TimetableModel.find(query)
    .populate('teacherId', 'firstName lastName email department')
    .populate('studentId', 'firstName lastName email enrollmentNumber class section')
    .sort({ dayOfWeek: 1, startTime: 1 });
};

export const getTimetableByStudent = async (studentId: string, dayOfWeek?: string) => {
  const query: any = { studentId, isActive: true };
  if (dayOfWeek) {
    query.dayOfWeek = dayOfWeek;
  }
  
  return await TimetableModel.find(query)
    .populate('teacherId', 'firstName lastName email department')
    .populate('studentId', 'firstName lastName email enrollmentNumber class section')
    .sort({ dayOfWeek: 1, startTime: 1 });
};

export const getAllTimetables = async (filters: {
  teacherId?: string;
  studentId?: string;
  dayOfWeek?: string;
  subject?: string;
  class?: string;
  section?: string;
}) => {
  const query: any = { isActive: true };
  
  if (filters.teacherId) query.teacherId = filters.teacherId;
  if (filters.studentId) query.studentId = filters.studentId;
  if (filters.dayOfWeek) query.dayOfWeek = filters.dayOfWeek;
  if (filters.subject) query.subject = new RegExp(filters.subject, 'i');
  if (filters.class) query.class = filters.class;
  if (filters.section) query.section = filters.section;

  return await TimetableModel.find(query)
    .populate('teacherId', 'firstName lastName email department')
    .populate('studentId', 'firstName lastName email enrollmentNumber class section')
    .sort({ dayOfWeek: 1, startTime: 1 });
};

export const getTimetableById = async (id: string) => {
  return await TimetableModel.findById(id)
    .populate('teacherId', 'firstName lastName email department')
    .populate('studentId', 'firstName lastName email enrollmentNumber class section');
};

export const updateTimetable = async (id: string, data: Partial<CreateTimetableData>) => {
  // Check for time conflicts if time is being updated
  if (data.startTime || data.endTime || data.dayOfWeek) {
    const existingTimetable = await TimetableModel.findById(id);
    if (!existingTimetable) {
      throw new Error('Timetable not found');
    }

    const conflict = await TimetableModel.findOne({
      _id: { $ne: id },
      teacherId: data.teacherId || existingTimetable.teacherId,
      dayOfWeek: data.dayOfWeek || existingTimetable.dayOfWeek,
      isActive: true,
      $or: [
        {
          startTime: { $lt: data.endTime || existingTimetable.endTime },
          endTime: { $gt: data.startTime || existingTimetable.startTime }
        }
      ]
    });

    if (conflict) {
      throw new Error('Time slot conflicts with existing timetable');
    }
  }

  return await TimetableModel.findByIdAndUpdate(
    id,
    { ...data, updatedAt: new Date() },
    { new: true }
  ).populate('teacherId', 'firstName lastName email department')
   .populate('studentId', 'firstName lastName email enrollmentNumber class section');
};

export const deleteTimetable = async (id: string) => {
  // Soft delete - set isActive to false
  return await TimetableModel.findByIdAndUpdate(
    id,
    { isActive: false, updatedAt: new Date() },
    { new: true }
  );
};

export const getTimetableConflicts = async (teacherId: string, dayOfWeek: string, startTime: string, endTime: string, excludeId?: string) => {
  const query: any = {
    teacherId,
    dayOfWeek,
    isActive: true,
    $or: [
      {
        startTime: { $lt: endTime },
        endTime: { $gt: startTime }
      }
    ]
  };

  if (excludeId) {
    query._id = { $ne: excludeId };
  }

  return await TimetableModel.find(query)
    .populate('teacherId', 'firstName lastName email department')
    .populate('studentId', 'firstName lastName email enrollmentNumber class section');
};
