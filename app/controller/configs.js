'use strict';

const { Controller } = require('egg');

class CofigsController extends Controller {
  async index() {
    const filter = this.ctx.query;
    this.ctx.body = {
      data: await this.ctx.service.configs.find(filter),
    };
  }
  async show() {
    const filter = this.ctx.query;
    const { id: _id } = this.ctx.params;
    this.ctx.body = {
      data: await this.ctx.service.configs.findOne({ ...filter, _id }),
    };
  }
  async create() {
    const { ctx } = this;

    const config = { ...ctx.request.body, user: ctx.query.user };
    const result = await ctx.service.configs.createOne(config);
    if (result)
      ctx.body = {
        type: 'success',
        content: 'Create new configuration successfully!',
        data: result,
      };
    else
      ctx.body = {
        type: 'error',
        content: 'Create new configuration unsuccessfully!',
        data: result,
      };
  }
}

module.exports = CofigsController;
