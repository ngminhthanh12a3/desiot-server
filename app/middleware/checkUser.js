module.exports = (options) => {
  return checkUser;
  /**
   *
   * @param {Egg.Context} ctx ctx
   * @param {any} next nexy
   */
  async function checkUser(ctx, next) {
    if (Object.keys(ctx.session.user).length) {
      const { _id: user } = ctx.session.user;
      ctx.query.user = user;
      await next();
    }
  }
};
