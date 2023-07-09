const { Config } = require('../models');

const Service = require('egg').Service;

class ConfigsService extends Service {
  async find(filter) {
    return await Config.find(filter);
  }
  async findOne(filter) {
    return await Config.findOne(filter);
  }
  async createOne(config) {
    const newConfig = new Config(config);
    return await newConfig.save();
  }
}

module.exports = ConfigsService;
