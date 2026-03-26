import dotenv from "dotenv";
dotenv.config(); // Must be FIRST before other imports

import express, { Express, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import eventRoutes from './api/v1/routes/eventRoutes';
import { HTTP_STATUS } from './constants/httpConstants';
import { getHelmetConfig } from './config/helmetConfig';
import { getCorsOptions } from './config/corsConfig';
import setupSwagger from './config/swagger';

const app: Express = express();

// Security middleware
app.use(getHelmetConfig());
app.use(getCorsOptions());

app.use(express.json());
app.use(morgan('combined'));

// Swagger documentation
setupSwagger(app);

// Versioned Health Check
app.get('/api/v1/health', (_req: Request, res: Response) => {
  res.status(HTTP_STATUS.OK).json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});