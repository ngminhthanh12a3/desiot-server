'use strict';

const { Controller } = require('egg');

class UIController extends Controller {
  async index() {
    const { ctx } = this;
    const filter = this.ctx.query;
    ctx.body = {
      data: await this.ctx.service.ui.find(filter),
    };
  }

  async show() {
    const filter = this.ctx.query;
    const { id: _id } = this.ctx.params;
    this.ctx.body = {
      data: await this.ctx.service.ui.findOne({ ...filter, _id }),
      // data: {
      //   items: [],
      //   layout: [],
      //   counter: 0,
      // },
    };
  }

  async create() {
    const { ctx } = this;
    const filter = ctx.query;
    const uiData = { ...ctx.request.body, ...filter };
    this.ctx.body = {
      data: await this.ctx.service.ui.create(uiData),
    };
  }

  async update() {
    const filter = this.ctx.query;
    const { id: _id } = this.ctx.params;

    const { config_id, ...restUpdate } = this.ctx.request.body;

    this.ctx.body = {
      data: await this.ctx.service.ui.findOneAndUpdate(
        { _id, config_id, ...filter },
        restUpdate
      ),
    };
  }
  async destroy() {
    const { id: _id = '' } = this.ctx.params;
    this.ctx.body = {
      data: await this.ctx.service.ui.findOneAndDelete({ _id }),
    };
  }
}

module.exports = UIController;
