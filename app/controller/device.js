'use strict';

const { Controller } = require('egg');

class DeviceController extends Controller {
  async index() {
    this.ctx.body = {
      data: await this.ctx.service.device.find(this.ctx.query),
    };
  }

  async show() {
    this.ctx.body = {
      data: await this.ctx.service.device.findOne(this.ctx.query),
    };
  }

  async create() {
    const filter = this.ctx.query;
    const deviceData = { ...this.ctx.request.body, ...filter };
    this.ctx.body = {
      data: await this.ctx.service.device.create(deviceData),
    };
  }
}

module.exports = DeviceController;
