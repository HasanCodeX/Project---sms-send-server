import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  phone: { type: String, required: true },
  eventType: { type: String, required: true }, // e.g., birthday, marriage, etc.
  eventDate: { type: Date, required: true },
  customMessage: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Event', eventSchema);
