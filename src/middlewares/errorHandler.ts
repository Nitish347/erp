import { NextFunction, Request, Response } from 'express';

// Centralized error handler
export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const status = 500;
  const message = error instanceof Error ? error.message : 'Internal Server Error';
  res.status(status).json({ success: false, message });
}


