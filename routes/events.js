import express from 'express';
import Event from '../models/Event.js';
import mongoose from 'mongoose';

const router = express.Router();

// ✅ GET all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: '❌ Failed to fetch events' });
  }
});

// ✅ POST create event
router.post('/', async (req, res) => {
  const { eventType, clientName, phone, eventDate, customMessage } = req.body;
  try {
    if (!eventType || !clientName || !phone || !eventDate || !customMessage) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newEvent = new Event({ eventType, clientName, phone, eventDate, customMessage });
    await newEvent.save();
    res.status(201).json({ message: '✅ Event added successfully' });
  } catch (err) {
    console.error('Error saving event:', err);
    res.status(500).json({ error: '❌ Failed to save event', details: err.message });
  }
});

// ✅ PUT update event
router.put('/:id', async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated document
    );
    if (!updatedEvent) {
      return res.status(404).json({ error: '❌ Event not found' });
    }
    res.json({ message: '✅ Event updated successfully', event: updatedEvent });
  } catch (error) {
    res.status(500).json({ error: '❌ Failed to update event', details: error.message });
  }
});

// ✅ DELETE event
router.delete('/:id', async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: '🗑️ Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: '❌ Failed to delete event' });
  }
});

export default router;
