/* eslint-disable space-before-function-paren */
/* eslint-disable arrow-parens */
const assert = require('assert');
// eslint-disable-next-line no-unused-vars
const { Application } = require('egg');
const mqtt = require('mqtt');

/**
 *
 * @param {Application} app a
 */
module.exports = (app) => {
  app.addSingleton('mqttclient', createOneClient);
  // alias to app.
  // https://github.com/eggjs/egg/blob/9ad39f59991bd48633b8da4abe1da5eb79a1de62/lib/core/singleton.js#L38
  //   app.mqtts = app.mqtt;
};

/**
 * @param  {Object} config   The config is processed by the framework. If the application is configured with multiple MySQL instances, each config would be passed in and call multiple createMysql
 * @param  {Egg.Application} app  the current application
 */
function createOneClient(config, app) {
  const { host, port, username, password } = config;
  assert(host && port && username && password);

  const connectUrl = `mqtt://${host}:${port}`;

  const client = mqtt.connect(connectUrl, {
    clientId: `mqtt_${Math.random().toString(16).slice(3)}`,
    clean: true,
    connectTimeout: 4000,
    username,
    password,
    reconnectPeriod: 1000,
  });
  // check before start the application
  app.beforeStart(() => {
    client.on('connect', () => {
      app.logger.info('[egg-mqtt] MQTT client initialize successfully');
      app.logger.info(
        `[egg-mqtt] MQTT host: ${client.options.host}, port: ${client.options.port}`
      );
      const topic = [
        process.env.DESIOT_MQTT_CLIENT_INIT_TOPIC,
        process.env.DESIOT_MQTT_CLIENT_EMOTIBIT_INIT_TOPIC,
      ];
      client.subscribe(topic, () =>
        app.logger.info(`MQTT client subscribed to topic: ${topic}`)
      );
    });
  });

  return client;
}
