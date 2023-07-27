const mongoose = require('mongoose');
const { Schema } = mongoose;
const configSchema = new Schema({
  name: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
});

configSchema.post(['findOneAndDelete', 'deleteOne'], function (doc) {
  const { Device, VStorage, UI } = require('.');
  const filter = { config_id: doc._id };
  console.log(filter);
  Device.deleteMany(filter).exec();
  VStorage.deleteMany(filter).exec();
  UI.deleteMany(filter).exec();
});

const Config = mongoose.model('config', configSchema);
module.exports = Config;
