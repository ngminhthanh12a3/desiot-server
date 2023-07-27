const { VStorage } = require('../models');

const Service = require('egg').Service;

class VStorageService extends Service {
  async find(filter) {
    return await VStorage.find(filter);
  }
  async findOne(filter) {
    return await VStorage.findOne(filter).lean().exec();
  }
  async findOneAndUpdate(filter, data) {
    return await VStorage.findOneAndUpdate(filter, data);
  }
  async create(doc) {
    const newVStorage = new VStorage(doc);
    return await newVStorage.save();
  }
  async findOneAndDelete(filter) {
    return await VStorage.findOneAndDelete(filter);
  }
  async updateMany(filter, update) {
    return VStorage.updateMany(filter, update);
  }
}

module.exports = VStorageService;
