const mongoose = require('mongoose');
const { Schema } = mongoose;
const deviceSchema = new Schema({
  gateway_id: { type: Schema.Types.ObjectId, ref: 'Gateway' },
  connection_type: {
    type: Number,
    enum: [0, 1],
  },
  connection_id: {
    type: Number,
    min: 0,
    max: 255,
  },
  name: {
    type: String,
    required: true,
  },
  config_id: {
    type: Schema.Types.ObjectId,
    ref: 'config',
  },
});

const Device = mongoose.model('device', deviceSchema);
module.exports = Device;
