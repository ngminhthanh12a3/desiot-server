'use strict';

const { Controller } = require('egg');

class VStorageController extends Controller {
  async index() {
    const filter = this.ctx.query;
    const data = await this.ctx.service.vstorage.find(filter);
    this.ctx.body = {
      data,
    };
  }
  async create() {
    const { body } = this.ctx.request;
    const { user } = this.ctx.query;
    this.ctx.body = {
      data: await this.ctx.service.vstorage.create({ ...body, user }),
    };
  }

  async show() {
    const { body } = this.ctx.request;
    const { user } = this.ctx.query;
    this.ctx.body = {
      data: await this.ctx.service.vstorage.findOne({ ...body, user }),
    };
  }
}

module.exports = VStorageController;
