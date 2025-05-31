// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import birthdayRoutes from './routes/birthdays.js';
// import { startScheduler } from './scheduler.js';

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// // Test route
// app.get('/', (req, res) => {
//   res.send('🎉 Birthday SMS Server is running!');
// });

// // Routes
// app.use('/birthdays', birthdayRoutes);

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log('✅ MongoDB connected');
//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on http://localhost:${PORT}`);
//       startScheduler(); // Start cron scheduler
//     });
//   })
//   .catch((err) => console.error('❌ DB connection error:', err));

// index.js

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import birthdayRoutes from './routes/birthdays.js';
import { startScheduler } from './scheduler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Root route for basic server check
app.get('/', (req, res) => {
  res.send('🎉 Birthday Reminder API is running!');
});

// Birthday routes
app.use('/birthdays', birthdayRoutes);

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      startScheduler(); // Start daily SMS scheduler
    });
  })
  .catch((err) => {
    console.error('❌ DB connection error:', err);
  });
