import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

import authRoutes from './modules/auth/auth.routes';
import studentRoutes from './modules/students/students.routes';
import attendanceRoutes from './modules/attendance/attendance.routes';
import feeRoutes from './modules/fees/fees.routes';
import reportRoutes from './modules/reports/reports.routes';
import noticeRoutes from './modules/notices/notices.routes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Security & utility middlewares
app.use(helmet());
app.use(cors({ origin: '*', credentials: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check API
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    system: 'MDCA School ERP API (M.D. Children Academy)',
    environment: process.env.NODE_ENV || 'development',
    time: new Date().toISOString(),
  });
});

// Versioned API Routes (/api/v1)
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/students', studentRoutes);
app.use('/api/v1/attendance', attendanceRoutes);
app.use('/api/v1/fees', feeRoutes);
app.use('/api/v1/reports', reportRoutes);
app.use('/api/v1/notices', noticeRoutes);

// Global Error Handler
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 MDCA School ERP API running on http://localhost:${PORT}`);
    console.log(`📚 Health check endpoint: http://localhost:${PORT}/health`);
  });
}

export default app;
