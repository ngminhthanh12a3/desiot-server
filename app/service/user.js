const { User } = require('../models');

const Service = require('egg').Service;

class DeviceService extends Service {
  async findOne(filter) {
    return User.findOne(filter).lean().exec();
  }
}

module.exports = DeviceService;
