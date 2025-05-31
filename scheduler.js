import cron from 'node-cron';
import dayjs from 'dayjs';
import Event from './models/Event.js';
import { sendSMS } from './utils/smsSender.js';

export const startScheduler = () => {
  cron.schedule('0 9 * * *', async () => {
    const today = dayjs().format('MM-DD');
    const events = await Event.find();

    const todayEvents = events.filter(
      e => dayjs(e.eventDate).format('MM-DD') === today
    );

    for (const event of todayEvents) {
      await sendSMS(event.phone, event.customMessage);
    }
  });
};
