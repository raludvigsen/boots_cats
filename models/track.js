var mongoose = require('mongoose');

var trackSchema = new mongoose.Schema({
  title: String,
  drums: Array,
  bpm: Number,
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});


var Track = mongoose.model('Track', trackSchema);

module.exports = Track;