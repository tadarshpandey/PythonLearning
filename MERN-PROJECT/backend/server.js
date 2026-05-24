import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import taskRoutes from './routes/taskRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Main Status Route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    message: 'ZenTask API is running smoothly',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/tasks', taskRoutes);

// Error Handling Middleware (fallback for non-existent routes)
app.use((req, res, next) => {
  res.status(404).json({ message: `Route not found - ${req.originalUrl}` });
});

// Global Exception Handler
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// Boot the Server
const startServer = async () => {
  // Try connecting to MongoDB. 
  // It returns false if MongoDB connection fails or is not configured, triggering fallback mode.
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  });
};

startServer();
