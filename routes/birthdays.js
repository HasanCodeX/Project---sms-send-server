import express from 'express';
import Birthday from '../models/Birthday.js';

const router = express.Router();

// Get all
router.get('/', async (req, res) => {
  const birthdays = await Birthday.find();
  res.json(birthdays);
});

// Add
router.post('/', async (req, res) => {
  const { name, phone, date } = req.body;
  try {
    const newBirthday = new Birthday({ name, phone, date });
    await newBirthday.save();
    res.status(201).json({ message: '🎈 Birthday added successfully!' });
  } catch (error) {
    res.status(500).json({ error: '❌ Failed to save birthday' });
  }
});

export default router;
