import mongoose from 'mongoose';

const birthdaySchema = new mongoose.Schema({
  name: String,
  phone: String,
  date: String // format: 'MM-DD'
});

export default mongoose.model('Birthday', birthdaySchema);
