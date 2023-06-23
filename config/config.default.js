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
    DESIOT_MONGOOSE_CONNECTION_STRING,
    DESIOT_MONGOOSE_DBNAME,
    DESIOT_MONGOOSE_REPLICASET,
    DESIOT_MONGOOSE_AUTHSOURCE,
    DESIOT_MONGOOSE_USER,
    DESIOT_MONGOOSE_PASS,
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
    mongoose: {
      client: {
        connectionString: DESIOT_MONGOOSE_CONNECTION_STRING,
        dbName: DESIOT_MONGOOSE_DBNAME,
        replicaSet: DESIOT_MONGOOSE_REPLICASET,
        authSource: DESIOT_MONGOOSE_AUTHSOURCE,
        user: DESIOT_MONGOOSE_USER,
        pass: DESIOT_MONGOOSE_PASS,
      },
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
