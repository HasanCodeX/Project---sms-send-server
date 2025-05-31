import express from 'express';
import Event from '../models/Event.js';

const router = express.Router();

// GET all events
router.get('/', async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

// POST create event
router.post('/', async (req, res) => {
  const { clientName, phone, eventType, eventDate, customMessage } = req.body;
  try {
    const event = new Event({ clientName, phone, eventType, eventDate, customMessage });
    await event.save();
    res.status(201).json({ message: '✅ Event added!' });
  } catch (error) {
    res.status(500).json({ error: '❌ Failed to save event' });
  }
});

// DELETE event
router.delete('/:id', async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: '🗑️ Event deleted' });
  } catch (error) {
    res.status(500).json({ error: '❌ Failed to delete event' });
  }
});

export default router;
