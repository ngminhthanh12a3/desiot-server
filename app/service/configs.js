const { Config } = require('../models');

const Service = require('egg').Service;

class ConfigsService extends Service {
  async find() {
    return await Config.find().lean().exec();
  }
  async createOne(config) {
    const newConfig = new Config(config);
    return await newConfig.save();
  }
}

module.exports = ConfigsService;
