const mongoose = require('mongoose');
const { Schema } = mongoose;
const configSchema = new Schema({
  name: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
});

const Config = mongoose.model('config', configSchema);
module.exports = Config;
