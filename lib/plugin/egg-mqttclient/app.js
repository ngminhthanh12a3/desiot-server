/* eslint-disable arrow-parens */
const mqttclient = require('./lib/mqttclient');

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  if (app.config.mongoose.app) mqttclient(app);
};
