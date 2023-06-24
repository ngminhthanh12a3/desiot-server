'use strict';
const path = require('path');
/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  mqttclient: {
    enable: true,
    path: path.join(__dirname, '../lib/plugin/egg-mqttclient'),
  },
  mongoose: {
    enable: true,
    path: path.join(__dirname, '../lib/plugin/egg-mongoose'),
  },
  security: {
    enable: false,
  },
};
