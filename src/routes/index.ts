import { Application, Router } from 'express';
import healthRouter from './modules/health.routes';
import teacherRouter from './modules/teacher.routes';
import studentRouter from './modules/student.routes';
import timetableRouter from './modules/timetable.routes';
import attendanceRouter from './modules/attendance.routes';
import authRouter from './modules/auth.routes';
import adminRouter from './modules/admin.routes';
import homeworkRouter from './modules/homework.routes';
import homeworkSubmissionRouter from './modules/homeworkSubmission.routes';
import examRouter from './modules/exam.routes';
import examTypeRouter from './modules/examType.routes';
import examResultRouter from './modules/examResult.routes';
import noticeRouter from './modules/notice.routes';
import medicalRecordRouter from './modules/medicalRecord.routes';
import classRouter from './modules/class.routes';
import subjectRouter from './modules/subject.routes';
import feeRouter from './modules/fee.routes';
import superAdminRouter from './modules/super-admin.routes';

export function registerRoutes(app: Application): void {
  const apiRoot = '/api/v1';
  const router = Router();

  router.use('/health', healthRouter);
  router.use('/auth', authRouter);
  router.use('/super-admin', superAdminRouter);
  router.use('/admin', adminRouter);
  router.use('/teachers', teacherRouter);
  router.use('/students', studentRouter);
  router.use('/timetables', timetableRouter);
  router.use('/attendance', attendanceRouter);
  router.use('/homework', homeworkRouter);
  router.use('/homework-submissions', homeworkSubmissionRouter);
  router.use('/exams', examRouter);
  router.use('/exam-types', examTypeRouter);
  router.use('/exam-results', examResultRouter);
  router.use('/notices', noticeRouter);
  router.use('/medical-records', medicalRecordRouter);
  router.use('/classes', classRouter);
  router.use('/subjects', subjectRouter);
  router.use('/fees', feeRouter);

  app.use(apiRoot, router);
}



