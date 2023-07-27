const { UI } = require('../models');

const Service = require('egg').Service;

class UIService extends Service {
  async find(filter) {
    return await UI.find(filter);
  }
  async create(newUIData) {
    const newUI = new UI(newUIData);
    return newUI.save();
  }
  async findOne(filter) {
    return await UI.findOne(filter);
  }
  async findOneAndUpdate(filter, uppdate) {
    return await UI.findOneAndUpdate(filter, uppdate);
  }
  async findOneAndDelete(filter) {
    return await UI.findOneAndDelete(filter);
  }
}

module.exports = UIService;
