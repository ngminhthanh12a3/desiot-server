const mongoose = require('mongoose');
const { Schema } = mongoose;
const vStorageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  config_id: {
    type: Schema.Types.ObjectId,
    ref: 'config',
    required: true,
  },
  type: {
    type: Number,
    enum: [0, 1, 2, 3],
    required: true,
  },
  vs_id: {
    type: Number,
    min: 0,
    max: 31,
    required: true,
  },
  data: {
    type: Map,
    of: Schema.Types.Mixed,
    default: {},
  },
});

vStorageSchema.index({ vs_id: 1, config_id: 1 }, { unique: true });

const VStorage = mongoose.model('vStorage', vStorageSchema);

module.exports = VStorage;
