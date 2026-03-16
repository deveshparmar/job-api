import { type Request, type Response, type NextFunction } from 'express';
import { config } from '../config/index.js';

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 1. Set default status codes and messages
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (config.NODE_ENV === 'dev') {
    // DEVELOPMENT: Send everything back so you can debug easily
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
      error: err
    });
  } else {
    // PRODUCTION: Send lean, non-leaky messages
    if (err.isOperational) {
      // Errors we created (e.g., 404, 400 validation)
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
    } else {
      console.error('ERROR 💥', err); // Log it for your own records
      res.status(500).json({
        status: 'error',
        message: 'Something went very wrong!'
      });
    }
  }
};