import { Application, Router } from 'express';
import healthRouter from './modules/health.routes';
import teacherRouter from './modules/teacher.routes';
import studentRouter from './modules/student.routes';

export function registerRoutes(app: Application): void {
  const apiRoot = '/api/v1';
  const router = Router();

  router.use('/health', healthRouter);
  router.use('/teachers', teacherRouter);
  router.use('/students', studentRouter);

  app.use(apiRoot, router);
}


