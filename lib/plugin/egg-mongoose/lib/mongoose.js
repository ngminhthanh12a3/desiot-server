/* eslint-disable space-before-function-paren */
/* eslint-disable arrow-parens */
const assert = require('assert');
// eslint-disable-next-line no-unused-vars
const { Application } = require('egg');
const mongoose = require('mongoose');

/**
 *
 * @param {Application} app a
 */
module.exports = (app) => {
  app.addSingleton('mongoose', createOneClient);
  // alias to app.
  // https://github.com/eggjs/egg/blob/9ad39f59991bd48633b8da4abe1da5eb79a1de62/lib/core/singleton.js#L38
  //   app.mqtts = app.mqtt;
};

/**
 * @param  {Object} config   The config is processed by the framework. If the application is configured with multiple MySQL instances, each config would be passed in and call multiple createMysql
 * @param  {Egg.Application} app  the current application
 */
function createOneClient(config, app) {
  const { connectionString, dbName, replicaSet, authSource, user, pass } =
    config;
  const mongooseConnect = mongoose.connect(connectionString, {
    dbName,
    replicaSet,
    authSource,
    user,
    pass,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongooseConnect
    .then((value) => {
      app.logger.info(`[egg-mongoose] Mongoose connected successfully!`);
      app.logger.info(
        `[egg-mongoose] Mongoose db name: ${value.connection.db.databaseName}`
      );
    })
    .catch((reson) =>
      app.logger.error('Mongoose connect unsuccessfully', reson)
    );

  return mongooseConnect;
}
