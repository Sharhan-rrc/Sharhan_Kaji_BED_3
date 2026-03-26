import dotenv from "dotenv";
dotenv.config(); // Must be FIRST before other imports

import express, { Express, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import eventRoutes from './api/v1/routes/eventRoutes';
import { HTTP_STATUS } from './constants/httpConstants';
import { getHelmetConfig } from './config/helmetConfig';
import { getCorsOptions } from './config/corsConfig';
import setupSwagger from './config/swagger';