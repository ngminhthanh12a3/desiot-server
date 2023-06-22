/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  require('dotenv').config();

  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1687411685289_2083';

  // add your middleware config here
  config.middleware = [];

  const {
    DESIOT_MQTT_CLIENT_HOST,
    DESIOT_MQTT_CLIENT_PORT,
    DESIOT_MQTT_CLIENT_USERNAME,
    DESIOT_MQTT_CLIENT_PASSWORD,
  } = process.env;

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    mqttclient: {
      client: {
        host: DESIOT_MQTT_CLIENT_HOST,
        port: DESIOT_MQTT_CLIENT_PORT,
        username: DESIOT_MQTT_CLIENT_USERNAME,
        password: DESIOT_MQTT_CLIENT_PASSWORD,
      },
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
