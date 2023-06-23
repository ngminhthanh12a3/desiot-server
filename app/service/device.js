const { Device } = require('../models');

const Service = require('egg').Service;

class DeviceService extends Service {
  async findOne(filter) {
    return Device.findOne(filter).lean().exec();
  }
}

module.exports = DeviceService;
