import { LunchModel } from '../models/Lunch.model';
import { TeacherModel } from '../models/Teacher.model';
import { StudentModel } from '../models/Student.model';
import { AdminModel } from '../models/Admin.model';

export interface CreateLunchData {
  teacherId: string;
  studentId: string;
  date?: Date;
  status: 'Full Meal' | 'Half Meal' | 'Not Taken' | 'Absent';
  class: string;
  section: string;
  remarks?: string;
  markedBy: string;
}

export interface LunchStats {
  totalRecords: number;
  fullMeals: number;
  halfMeals: number;
  notTaken: number;
  absent: number;
  fullMealPercentage: number;
}

export const markLunch = async (data: CreateLunchData) => {
  // Validate teacher exists
  let teacher: any = await TeacherModel.findById(data.teacherId);
  if (!teacher) {
    // Check if it is an Admin (Institution) instead
    teacher = await AdminModel.findById(data.teacherId);
    if (!teacher) {
      throw new Error('Teacher or Institution not found');
    }
  }

  // Validate student exists
  const student = await StudentModel.findById(data.studentId);
  if (!student) {
    throw new Error('Student not found');
  }

  // Check if lunch record already exists for this student on this date
  const dateToCheck = data.date || new Date();
  const existingLunch = await LunchModel.findOne({
    studentId: data.studentId,
    date: {
      $gte: new Date(dateToCheck).setHours(0, 0, 0, 0),
      $lt: new Date(dateToCheck).setHours(23, 59, 59, 999)
    }
  });

  if (existingLunch) {
    // Update existing lunch record
    return await LunchModel.findByIdAndUpdate(
      existingLunch._id,
      {
        ...data,
        markedAt: new Date(),
        updatedAt: new Date()
      },
      { new: true }
    ).populate('teacherId', 'firstName lastName email department')
      .populate('studentId', 'firstName lastName email enrollmentNumber class section');
  }

  // Create new lunch record
  const lunch = new LunchModel({
    ...data,
    date: dateToCheck,
    markedAt: new Date()
  });

  return await lunch.save();
};

export const getLunchByTeacher = async (teacherId: string, startDate?: Date, endDate?: Date) => {
  const query: any = { teacherId };

  if (startDate && endDate) {
    query.date = {
      $gte: startDate,
      $lte: endDate
    };
  }

  return await LunchModel.find(query)
    .populate('teacherId', 'firstName lastName email department')
    .populate('studentId', 'firstName lastName email enrollmentNumber class section')
    .sort({ date: -1, createdAt: -1 });
};

export const getLunchByStudent = async (studentId: string, startDate?: Date, endDate?: Date) => {
  const query: any = { studentId };

  if (startDate && endDate) {
    query.date = {
      $gte: startDate,
      $lte: endDate
    };
  }

  return await LunchModel.find(query)
    .populate('teacherId', 'firstName lastName email department')
    .populate('studentId', 'firstName lastName email enrollmentNumber class section')
    .sort({ date: -1, createdAt: -1 });
};

export const getAllLunch = async (filters: {
  teacherId?: string;
  studentId?: string;
  startDate?: Date;
  endDate?: Date;
  status?: string;
  class?: string;
  section?: string;
}) => {
  const query: any = {};

  if (filters.teacherId) query.teacherId = filters.teacherId;
  if (filters.studentId) query.studentId = filters.studentId;
  if (filters.status) query.status = filters.status;
  if (filters.class) query.class = filters.class;
  if (filters.section) query.section = filters.section;

  if (filters.startDate && filters.endDate) {
    query.date = {
      $gte: filters.startDate,
      $lte: filters.endDate
    };
  }

  return await LunchModel.find(query)
    .populate('teacherId', 'firstName lastName email department')
    .populate('studentId', 'firstName lastName email enrollmentNumber class section')
    .sort({ date: -1, createdAt: -1 });
};

export const getLunchById = async (id: string) => {
  return await LunchModel.findById(id)
    .populate('teacherId', 'firstName lastName email department')
    .populate('studentId', 'firstName lastName email enrollmentNumber class section');
};

export const updateLunch = async (id: string, data: Partial<CreateLunchData>) => {
  return await LunchModel.findByIdAndUpdate(
    id,
    {
      ...data,
      markedAt: new Date(),
      updatedAt: new Date()
    },
    { new: true }
  ).populate('teacherId', 'firstName lastName email department')
    .populate('studentId', 'firstName lastName email enrollmentNumber class section');
};

export const deleteLunch = async (id: string) => {
  return await LunchModel.findByIdAndDelete(id);
};

export const getLunchStats = async (teacherId?: string, studentId?: string, startDate?: Date, endDate?: Date): Promise<LunchStats> => {
  const query: any = {};

  if (teacherId) query.teacherId = teacherId;
  if (studentId) query.studentId = studentId;

  if (startDate && endDate) {
    query.date = {
      $gte: startDate,
      $lte: endDate
    };
  }

  const lunchRecords = await LunchModel.find(query);

  const totalRecords = lunchRecords.length;
  const fullMeals = lunchRecords.filter(record => record.status === 'Full Meal').length;
  const halfMeals = lunchRecords.filter(record => record.status === 'Half Meal').length;
  const notTaken = lunchRecords.filter(record => record.status === 'Not Taken').length;
  const absent = lunchRecords.filter(record => record.status === 'Absent').length;

  const fullMealPercentage = totalRecords > 0 ? Math.round((fullMeals / totalRecords) * 100) : 0;

  return {
    totalRecords,
    fullMeals,
    halfMeals,
    notTaken,
    absent,
    fullMealPercentage
  };
};

export const getDailyLunch = async (date: Date, teacherId?: string, className?: string, section?: string) => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const query: any = {
    date: {
      $gte: startOfDay,
      $lte: endOfDay
    }
  };

  if (teacherId) query.teacherId = teacherId;
  if (className) query.class = className;
  if (section) query.section = section;

  return await LunchModel.find(query)
    .populate('teacherId', 'firstName lastName email department')
    .populate('studentId', 'firstName lastName email enrollmentNumber class section')
    .sort({ createdAt: 1 });
};

export const bulkMarkLunch = async (lunchData: CreateLunchData[]) => {
  const results = [];

  for (const data of lunchData) {
    try {
      const result = await markLunch(data);
      results.push({ success: true, data: result });
    } catch (error: any) {
      results.push({ success: false, error: error.message, data });
    }
  }

  return results;
};
