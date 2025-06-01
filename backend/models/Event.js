const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String },
  date: { type: Date, required: true },
  time: { type: String },
  location: { type: String },
  category: { type: String, required: true },
  description: { type: String },
  price: { type: Number },
  sourceUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
  isFavorite: { type: Boolean, default: null }
});

module.exports = mongoose.model('Event', eventSchema);