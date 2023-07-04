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
    const { _id: user } = this.ctx.session.user;
    this.ctx.body = {
      data: await this.ctx.service.vstorage.create({ ...body, user }),
    };
  }
}

module.exports = VStorageController;
