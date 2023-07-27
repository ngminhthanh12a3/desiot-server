const { Device } = require('../models');

const Service = require('egg').Service;

class DeviceService extends Service {
  async find(query) {
    return Device.find(query).lean().exec();
  }
  async findOne(filter) {
    return Device.findOne(filter).lean().exec();
  }
  async findOneAndUpdate(filter, update, options = {}) {
    return Device.findOneAndUpdate(filter, update, options);
  }
  async create(devData) {
    const newDev = new Device(devData);
    return newDev.save();
  }
  async findOneAndDelete(filter) {
    const deletedDevice = await Device.findOneAndDelete(filter);
    if (!!deletedDevice) {
      const VSFilter = {
        user: deletedDevice.user,
        config_id: deletedDevice.config_id,
      };
      this.ctx.service.vstorage.updateMany(VSFilter, {
        $unset: { [`data.${deletedDevice._id}`]: 1 },
      });
    }

    return deletedDevice;
  }
}

module.exports = DeviceService;
