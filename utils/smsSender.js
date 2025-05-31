import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const sendSMS = async (phone, message) => {
  try {
    const response = await axios.post(process.env.SMS_SYNC_URL, {
      to: phone,
      message,
    });
    console.log(`📤 SMS sent to ${phone}: ${message}`);
    return response.data;
  } catch (error) {
    console.error(`❌ Failed to send SMS to ${phone}:`, error.message);
    throw error;
  }
};
