'use strict';

const { Controller } = require('egg');

class CofigsController extends Controller {
  async create() {
    const { ctx } = this;
    console.log(ctx.request.body, ctx.session.user);
    ctx.body = { type: 'success', content: 'OK' };
  }
}

module.exports = CofigsController;
