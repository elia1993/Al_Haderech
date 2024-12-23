import mongoose from 'mongoose';

const visitSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    required: true,
    default: Date.now
  }
});

const Visit = mongoose.model('Visit', visitSchema);

export default Visit;