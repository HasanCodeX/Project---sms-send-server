import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import eventRoutes from './routes/events.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Log all incoming requests
app.use((req, res, next) => {
  console.log(`🔥 Incoming request: ${req.method} ${req.url}`);
  next();
});

// ✅ API routes
app.use('/events', eventRoutes);

// ✅ Base route
app.get('/', (req, res) => {
  console.log('🌐 GET / route hit');
  res.send('🎉 API is running. Use /events to get event data.');
});

// ✅ Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error.message);
  });
