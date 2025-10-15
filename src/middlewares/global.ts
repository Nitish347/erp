import { Application, Request, Response, NextFunction } from 'express';

export function registerGlobalMiddlewares(app: Application): void {
  app.use((req: Request, _res: Response, next: NextFunction) => {
    // basic request id placeholder
    (req as any).requestId = Math.random().toString(36).slice(2);
    next();
  });
}


