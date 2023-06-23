const mongoose = require('mongoose');
const { Schema } = mongoose;
const deviceSchema = new Schema({
  gateway_id: { type: Schema.Types.ObjectId, ref: 'Gateway', required: true },
  connection_type: {
    type: Number,
    enum: [0, 1],
    required: true,
  },
  connection_id: {
    type: Number,
    min: 0,
    max: 255,
    required: true,
  },
});

const Device = mongoose.model('device', deviceSchema);
module.exports = Device;
