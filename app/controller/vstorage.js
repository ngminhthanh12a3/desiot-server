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
    const { id: _id } = this.ctx.params;
    const filter = this.ctx.query;
    this.ctx.body = {
      data: await this.ctx.service.vstorage.findOne({ _id, ...filter }),
    };
  }

  async update() {
    const filter = this.ctx.query;
    const { id: _id } = this.ctx.params;
    const data = this.ctx.request.body;
    const foundData = await this.ctx.service.vstorage.findOneAndUpdate(
      { _id, ...filter },
      data
    );
    this.ctx.body = {
      data: foundData,
    };
  }
}

module.exports = VStorageController;
