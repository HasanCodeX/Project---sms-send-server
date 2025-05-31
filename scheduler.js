import cron from 'node-cron';
import axios from 'axios';
import dotenv from 'dotenv';
import Birthday from './models/Birthday.js';
import dayjs from 'dayjs';

dotenv.config();

export const startScheduler = () => {
  cron.schedule('0 9 * * *', async () => {
    const today = dayjs().format('MM-DD');
    const birthdays = await Birthday.find({ date: today });

    for (const person of birthdays) {
      try {
        await axios.post(process.env.SMS_SYNC_URL, {
          username: process.env.SMS_SYNC_USERNAME,
          password: process.env.SMS_SYNC_PASSWORD,
          to: person.phone,
          message: `🎉 শুভ জন্মদিন ${person.name}!`
        });
        console.log(`✅ SMS sent to ${person.name}`);
      } catch (error) {
        console.error(`❌ Failed to send SMS to ${person.name}:`, error.message);
      }
    }
  });

  console.log('🕒 SMS scheduler started');
};
