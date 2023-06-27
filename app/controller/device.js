'use strict';

const { Controller } = require('egg');

class DeviceController extends Controller {
  async index() {
    this.ctx.body = {
      data: await this.ctx.service.device.find(this.ctx.query),
    };
  }
  async create() {
    const deviceData = this.ctx.request.body;
    this.ctx.body = {
      data: await this.ctx.service.device.create(deviceData),
    };
  }
}

module.exports = DeviceController;
