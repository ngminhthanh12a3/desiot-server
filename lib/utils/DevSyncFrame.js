const { DESIOT_FRAME } = require('../src/configs');
const { FrameHandler } = require('../src');
module.exports = class DevSyncFrame {
  /**
   *
   * @param {Egg.Application} app app
   * @param {string} dev_id devid
   * @param {{type: number;
   *         name: string;
   *         config_id: Types.ObjectId;
   *         user: Types.ObjectId;
   *         vs_id: number;
   *         data?: Map<string, number>;
   *       }} vsModel vsModel
   */
  constructor(app, dev_id, vsModel) {
    this.app = app;
    this.ctx = app.createAnonymousContext();
    this.dev_id = dev_id;
    this.vsModel = vsModel;
  }
  async sendFrame() {
    const devModel = await this.ctx.service.device.findOne({
      _id: this.dev_id,
    });
    const topic = devModel.gateway_id;

    const headers = Buffer.from([
      DESIOT_FRAME.H1_DEFAULT,
      DESIOT_FRAME.H2_DEFAULT,
    ]);
    const cmd = Buffer.from([DESIOT_FRAME.CMD_SYNC_VIRTUAL_STORAGE]);
    //
    this.dataLen = new Uint16Array(1).fill(DESIOT_FRAME.DEV_SYNC_ADD_DATA_SIZE);
    //
    const connection_ids = Buffer.from([
      devModel.connection_type,
      devModel.connection_id,
    ]);
    //
    const vs_id = Buffer.from([this.vsModel.vs_id]);
    //
    let devData;
    switch (this.vsModel.type) {
      case DESIOT_FRAME.VS_TYPE_INT:
        {
          this.dataLen[0] += DESIOT_FRAME.VS_TYPE_INT_DATA_SIZE;
          const data = this.vsModel.data[`${devModel._id}`];
          devData = new Uint32Array(1).fill(data);
        }
        break;
      case DESIOT_FRAME.VS_TYPE_FLOAT:
        {
          this.dataLen[0] += DESIOT_FRAME.VS_TYPE_INT_DATA_SIZE;
          const data = this.vsModel.data[`${devModel._id}`];
          devData = new Float32Array(1).fill(data);
        }
        break;
      case DESIOT_FRAME.VS_TYPE_STRING:
        {
          const stringData = String(this.vsModel.data[`${devModel._id}`]);
          devData = Uint8Array.from(
            Array.from(stringData).map((letter) => letter.charCodeAt(0))
          );
        }
        break;
      default:
        break;
    }
    // undefined bug
    if (devData === undefined) return;

    const dataBuffer = Buffer.concat([
      Buffer.from(this.dataLen.buffer),
      connection_ids,
      vs_id,
      Buffer.from(devData.buffer),
    ]);
    this.data = Uint8Array.from(dataBuffer);
    if (DESIOT_FRAME.ENCRYPT_ENABLE) {
      // console.log(this.data);
      await this.encryptData();
    }

    const dataPacket = Buffer.concat([cmd, Buffer.from(this.data.buffer)]);
    //
    const trailers = Buffer.from([
      DESIOT_FRAME.T1_DEFAULT,
      DESIOT_FRAME.T2_DEFAULT,
    ]);
    const { FrameHandler } = require('../src');
    //
    const crc = new Uint16Array(1);
    crc[0] = await FrameHandler.crcCalculate(dataPacket);
    const frame = [headers, dataPacket, trailers, Buffer.from(crc.buffer)];
    const message = Buffer.concat(frame);
    this.app.mqttclient.publish('test/gateway/' + topic, message, {
      qos: 2,
      retain: false,
    });
  }
  async encryptData() {
    const { chacha20poly1305_run, CC20_P1305_Mode } = require('../src');

    const [computedTag, encryptedU8DataPacket] = await chacha20poly1305_run(
      this.data,
      CC20_P1305_Mode.ENCRYPT
    );

    this.dataLen[0] += DESIOT_FRAME.TAG_SIZE;
    const encryptedU8Data = encryptedU8DataPacket.slice(
      DESIOT_FRAME.DATA_LEN_SIZE
    );
    const encryptDataBuffer = Buffer.concat([
      Buffer.from(this.dataLen.buffer),
      Buffer.from(computedTag.buffer),
      Buffer.from(encryptedU8Data.buffer),
    ]);
    this.data = new Uint8Array(encryptDataBuffer);
  }
};
