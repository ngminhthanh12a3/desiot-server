/* eslint-disable arrow-parens */
const mongoose = require('./lib/mongoose');

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  if (app.config.mongoose.app) mongoose(app);
};
