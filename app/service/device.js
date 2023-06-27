const { Device } = require('../models');

const Service = require('egg').Service;

class DeviceService extends Service {
  async find(query) {
    return Device.find(query).lean().exec();
  }
  async findOne(filter) {
    return Device.findOne(filter).lean().exec();
  }
  async create(devData) {
    const newDev = new Device(devData);
    return newDev.save();
  }
}

module.exports = DeviceService;
