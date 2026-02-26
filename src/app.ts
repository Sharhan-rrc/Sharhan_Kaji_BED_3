// src/app.ts
import express, { Express, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import eventRoutes from './api/v1/routes/eventRoutes';
import { HTTP_STATUS } from './constants/httpConstants';

const app: Express = express();

app.use(express.json());
app.use(morgan('combined'));

// Health check
app.get('/health', (_req: Request, res: Response) => {
  res.status(HTTP_STATUS.OK).json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// API routes
app.use('/api/v1', eventRoutes);

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Route not found' });
});

// Error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    message: err.message || 'Internal server error'
  });
});

export default app;