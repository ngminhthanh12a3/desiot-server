const { Application } = require('egg');
const { FrameHandler } = require('./lib/src');

// app.js or agent.js
class AppBootHook {
  /**
   *
   * @param {Application} app app
   */
  constructor(app) {
    this.app = app;
  }

  configWillLoad() {
    // Ready to call configDidLoad,
    // Config, plugin files are referred,
    // this is the last chance to modify the config.
  }

  configDidLoad() {
    // Config, plugin files have been loaded.
  }

  async didLoad() {
    // All files have loaded, start plugin here.
    this.app.mqttclient.on('connect', () => {
      this.app.mqttclient.on('message', (topic, payload) => {
        const payloadU8Buf = new Uint8Array(payload);
        const hFrame = new FrameHandler(payloadU8Buf);
        hFrame.parseFrame();
      });
    });
  }

  async willReady() {
    // All plugins have started, can do some thing before app ready
  }

  async didReady() {
    // Worker is ready, can do some things
    // don't need to block the app boot.
  }

  async serverDidReady() {
    // Server is listening.
  }

  async beforeClose() {
    // Do some thing before app close.
  }
}

module.exports = AppBootHook;
