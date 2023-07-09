const mongoose = require('mongoose');
const { Schema } = mongoose;
const UISchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  config_id: {
    type: Schema.Types.ObjectId,
    ref: 'config',
  },
  name: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    default: [],
  },
  counter: {
    type: Number,
    default: 0,
  },
});
const UI = mongoose.model('UI', UISchema);

module.exports = UI;
