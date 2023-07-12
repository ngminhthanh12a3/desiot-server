module.exports = (options) => {
  return checkUser;
  /**
   *
   * @param {Egg.Context} ctx ctx
   * @param {any} next nexy
   */
  async function checkUser(ctx, next) {
    const { user = {} } = ctx.session;
    if (Object.keys(user).length) {
      const { _id: user } = ctx.session.user;
      ctx.query.user = user;
      await next();
    }
  }
};
