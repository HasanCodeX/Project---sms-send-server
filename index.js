import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import eventRoutes from './routes/events.js';
import { startScheduler } from './scheduler.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/events', eventRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
      startScheduler();
    });
  })
  .catch(err => console.error('❌ DB connection error:', err));
