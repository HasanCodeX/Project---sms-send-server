import axios from 'axios';
const smsUrl = process.env.SMS_SYNC_URL || 'http://192.168.0.105:1210';

export const sendSMS = async (phone, message) => {
  try {
    const response = await axios.post(`${smsUrl}/sms`, {
      to: phone,
      message: message
    });

    console.log('📨 SMS sent to', phone);
  } catch (error) {
    console.error('❌ Failed to send SMS to', phone, error.message);
  }
};
