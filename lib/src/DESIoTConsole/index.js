module.exports = class DESIoTConsole {
  /**
   *
   * @param {any} message message
   * @param  {...any} optionalParams optionalParams
   */
  static log(message, ...optionalParams) {
    console.log(message, ...optionalParams);
  }
  static time(label = '') {
    console.time(label);
  }
  static timeEnd(label = '') {
    console.timeEnd(label);
  }
};
