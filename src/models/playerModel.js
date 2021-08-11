const mongoose = require('mongoose');

const playerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user_id: { type: String, required: true },
  guild_id: { type: String, required: true },
  username: { type: String, required: true },
});

module.exports = mongoose.model('Player', playerSchema);