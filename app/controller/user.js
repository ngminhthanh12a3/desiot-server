'use strict';

const { Controller } = require('egg');

class UserController extends Controller {
  async currentUser() {
    const { user } = this.ctx.session;
    if (user)
      this.ctx.body = {
        success: true,
        data: user,
      };
    else {
      this.ctx.status = 401;
      this.ctx.body = {
        data: {
          isLogin: false,
        },
        errorCode: '401',
        errorMessage: 'Please login first!',
        success: true,
      };
    }
  }
  async loginAccount() {
    const { password, username, type } = this.ctx.request.body;

    const foundUser = await this.ctx.service.user.findOne({ username });
    const resBody = {
      status: 'error',
      type,
      currentAuthority: 'guest',
    };
    if (foundUser)
      if (password === foundUser.password && username === foundUser.username) {
        resBody.status = 'ok';
        resBody.currentAuthority = foundUser.access;
        this.ctx.session.user = foundUser;
      }
    this.ctx.body = resBody;
  }

  async outLogin() {
    this.ctx.session.user = {};
    this.ctx.body = { data: {}, success: true };
  }
}

module.exports = UserController;
