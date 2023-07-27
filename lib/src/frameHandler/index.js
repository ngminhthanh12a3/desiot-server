const { DevSyncFrame } = require('../../utils');
const { DESIOT_FRAME } = require('../configs');

const crctable16 = new Uint16Array([
  0x0000, 0x1305, 0x260a, 0x350f, 0x4c14, 0x5f11, 0x6a1e, 0x791b, 0x9828,
  0x8b2d, 0xbe22, 0xad27, 0xd43c, 0xc739, 0xf236, 0xe133, 0x2355, 0x3050,
  0x055f, 0x165a, 0x6f41, 0x7c44, 0x494b, 0x5a4e, 0xbb7d, 0xa878, 0x9d77,
  0x8e72, 0xf769, 0xe46c, 0xd163, 0xc266, 0x46aa, 0x55af, 0x60a0, 0x73a5,
  0x0abe, 0x19bb, 0x2cb4, 0x3fb1, 0xde82, 0xcd87, 0xf888, 0xeb8d, 0x9296,
  0x8193, 0xb49c, 0xa799, 0x65ff, 0x76fa, 0x43f5, 0x50f0, 0x29eb, 0x3aee,
  0x0fe1, 0x1ce4, 0xfdd7, 0xeed2, 0xdbdd, 0xc8d8, 0xb1c3, 0xa2c6, 0x97c9,
  0x84cc, 0x8d54, 0x9e51, 0xab5e, 0xb85b, 0xc140, 0xd245, 0xe74a, 0xf44f,
  0x157c, 0x0679, 0x3376, 0x2073, 0x5968, 0x4a6d, 0x7f62, 0x6c67, 0xae01,
  0xbd04, 0x880b, 0x9b0e, 0xe215, 0xf110, 0xc41f, 0xd71a, 0x3629, 0x252c,
  0x1023, 0x0326, 0x7a3d, 0x6938, 0x5c37, 0x4f32, 0xcbfe, 0xd8fb, 0xedf4,
  0xfef1, 0x87ea, 0x94ef, 0xa1e0, 0xb2e5, 0x53d6, 0x40d3, 0x75dc, 0x66d9,
  0x1fc2, 0x0cc7, 0x39c8, 0x2acd, 0xe8ab, 0xfbae, 0xcea1, 0xdda4, 0xa4bf,
  0xb7ba, 0x82b5, 0x91b0, 0x7083, 0x6386, 0x5689, 0x458c, 0x3c97, 0x2f92,
  0x1a9d, 0x0998, 0x09ad, 0x1aa8, 0x2fa7, 0x3ca2, 0x45b9, 0x56bc, 0x63b3,
  0x70b6, 0x9185, 0x8280, 0xb78f, 0xa48a, 0xdd91, 0xce94, 0xfb9b, 0xe89e,
  0x2af8, 0x39fd, 0x0cf2, 0x1ff7, 0x66ec, 0x75e9, 0x40e6, 0x53e3, 0xb2d0,
  0xa1d5, 0x94da, 0x87df, 0xfec4, 0xedc1, 0xd8ce, 0xcbcb, 0x4f07, 0x5c02,
  0x690d, 0x7a08, 0x0313, 0x1016, 0x2519, 0x361c, 0xd72f, 0xc42a, 0xf125,
  0xe220, 0x9b3b, 0x883e, 0xbd31, 0xae34, 0x6c52, 0x7f57, 0x4a58, 0x595d,
  0x2046, 0x3343, 0x064c, 0x1549, 0xf47a, 0xe77f, 0xd270, 0xc175, 0xb86e,
  0xab6b, 0x9e64, 0x8d61, 0x84f9, 0x97fc, 0xa2f3, 0xb1f6, 0xc8ed, 0xdbe8,
  0xeee7, 0xfde2, 0x1cd1, 0x0fd4, 0x3adb, 0x29de, 0x50c5, 0x43c0, 0x76cf,
  0x65ca, 0xa7ac, 0xb4a9, 0x81a6, 0x92a3, 0xebb8, 0xf8bd, 0xcdb2, 0xdeb7,
  0x3f84, 0x2c81, 0x198e, 0x0a8b, 0x7390, 0x6095, 0x559a, 0x469f, 0xc253,
  0xd156, 0xe459, 0xf75c, 0x8e47, 0x9d42, 0xa84d, 0xbb48, 0x5a7b, 0x497e,
  0x7c71, 0x6f74, 0x166f, 0x056a, 0x3065, 0x2360, 0xe106, 0xf203, 0xc70c,
  0xd409, 0xad12, 0xbe17, 0x8b18, 0x981d, 0x792e, 0x6a2b, 0x5f24, 0x4c21,
  0x353a, 0x263f, 0x1330, 0x0035,
]);
module.exports = class FrameHandler {
  /**
   *
   * @param {Uint8Array} frame frame
   * @param {Egg.Context} ctx ctx
   */
  constructor(frame, ctx) {
    /**
     * @type {Uint8Array} frame
     */
    this.frame = frame;

    /**
     * @type {Egg.Context}
     */
    this.ctx = ctx;

    this.h1 = frame[DESIOT_FRAME.H1_INDEX];
    this.h2 = frame[DESIOT_FRAME.H2_INDEX];
    this.cmd = frame[DESIOT_FRAME.CMD_INDEX];
    this.dataLen =
      (frame[DESIOT_FRAME.DT_LEN_1_INDEX] |
        (frame[DESIOT_FRAME.DT_LEN_2_INDEX] << 8)) &
      DESIOT_FRAME.DT_LEN_MASK;

    this.dataPacket = frame.slice(
      DESIOT_FRAME.CMD_INDEX,
      DESIOT_FRAME.CMD_INDEX +
        DESIOT_FRAME.CMD_SIZE +
        DESIOT_FRAME.DATA_LEN_SIZE +
        this.dataLen
    );
    this.data = this.dataPacket.subarray(
      DESIOT_FRAME.CMD_SIZE + DESIOT_FRAME.DATA_LEN_SIZE
    );
    // console.log(frame);
    const T1_POS = DESIOT_FRAME.DATA_START_INDEX + this.dataLen;
    this.t1 = frame[T1_POS];
    this.t2 = frame[T1_POS + 1];
    this.crc = frame[T1_POS + 2] | (frame[T1_POS + 3] << 8);
  }
  async parseFrame() {
    if (
      this.h1 !== DESIOT_FRAME.H1_DEFAULT &&
      this.h2 !== DESIOT_FRAME.H2_DEFAULT &&
      this.t1 !== DESIOT_FRAME.T1_DEFAULT &&
      this.t2 !== DESIOT_FRAME.T2_DEFAULT
    )
      // check h1 h2 t1 t2
      return console.error('Frame parsing error');

    const crcCalculate = await FrameHandler.crcCalculate(
      this.dataPacket,
      this.dataLen + DESIOT_FRAME.CMD_SIZE + DESIOT_FRAME.DATA_LEN_SIZE
    );
    if (this.crc !== crcCalculate)
      return console.error(
        'Frame crc error ',
        this.crc.toString(16),
        crcCalculate.toString(16)
      );

    if (DESIOT_FRAME.ENCRYPT_ENABLE) this.decryptFrame();
    else this.handleSuccessFrame();
  }

  /**
   *
   * @param {Uint8Array | Buffer} bytes data
   * @param {number} BYTES_LEN data
   * @returns {Promise<number>} number
   */
  static async crcCalculate(bytes, BYTES_LEN = 0) {
    const crc = new Uint16Array(1).fill(0);
    for await (const byte of bytes) {
      /* XOR-in next input byte into MSB of crc, that's our new intermediate divident */
      const pos = new Uint8Array(1).fill((crc[0] >> 8) ^ byte)[0];
      /* Shift out the MSB used for division per lookuptable and XOR with the remainder */
      crc[0] = (crc[0] << 8) ^ crctable16[pos];
    }
    return crc[0];
  }

  async handleSuccessFrame() {
    await this.updateConnection();
    const config_idU8Arr = this.data.slice(
      DESIOT_FRAME.CONFIG_ID_POS,
      DESIOT_FRAME.CONFIG_ID_POS + DESIOT_FRAME.CONFIG_ID_SIZE
    );
    this.config_id = new TextDecoder()
      .decode(config_idU8Arr)
      .replace(/\0/g, '');
    switch (this.cmd) {
      case DESIOT_FRAME.CMD_DEVICE_ASSIGN_VIRTUAL_STORAGE:
        this.vs_id = this.data[DESIOT_FRAME.MAIN_DATA_START_POS];
        const { type: vs_type } =
          (await this.ctx.service.vstorage.findOne({
            vs_id: this.vs_id,
            config_id: this.config_id,
          })) || {};
        // bug
        if (vs_type === undefined) return;

        switch (vs_type) {
          case DESIOT_FRAME.VS_TYPE_INT:
            this.vs_data = new Int32Array(
              this.data.slice(
                DESIOT_FRAME.MAIN_DATA_START_POS + 1,
                DESIOT_FRAME.MAIN_DATA_START_POS + 1 + 4
              ).buffer
            )[0];

            break;

          case DESIOT_FRAME.VS_TYPE_FLOAT:
            this.vs_data = new Float32Array(
              this.data.slice(
                DESIOT_FRAME.MAIN_DATA_START_POS + 1,
                DESIOT_FRAME.MAIN_DATA_START_POS + 1 + 4
              ).buffer
            )[0];
            break;
        }

        // Update VS
        if (this.vs_data !== undefined)
          this.ctx.service.vstorage.findOneAndUpdate(
            { vs_id: this.vs_id, config_id: this.config_id },
            {
              $set: {
                [`data.${this.device_id}`]: this.vs_data,
              },
            }
          );
        break;
      case DESIOT_FRAME.CMD_DEVICE_READ_VIRTUAL_STORAGE: {
        this.vs_id = this.data[DESIOT_FRAME.MAIN_DATA_START_POS];
        const vsModel =
          (await this.ctx.service.vstorage.findOne({
            vs_id: this.vs_id,
            config_id: this.config_id,
          })) || undefined;

        // bug
        if (vsModel !== undefined) {
          const devSyncFrame = new DevSyncFrame(
            this.ctx.app,
            this.device_id,
            vsModel
          );
          devSyncFrame.sendFrame();
        }
        break;
      }
      default:
        break;
    }
  }
  async updateConnection() {
    const gateway_idU8Arr = this.data.slice(
      DESIOT_FRAME.GATEWAY_ID_POS,
      DESIOT_FRAME.GATEWAY_ID_POS + DESIOT_FRAME.GATEWAY_ID_SIZE
    );
    this.gateway_id = new TextDecoder()
      .decode(gateway_idU8Arr)
      .replace(/\0/g, '');
    this.connection_type = this.data[DESIOT_FRAME.CONNECTION_TYPE_POS];
    this.connection_id = this.data[DESIOT_FRAME.CONNECTION_ID_POS];
    const device_idU8Arr = this.data.slice(
      DESIOT_FRAME.DEVICE_ID_POS,
      DESIOT_FRAME.DEVICE_ID_POS + DESIOT_FRAME.DEVICE_ID_SIZE
    );
    this.device_id = new TextDecoder()
      .decode(device_idU8Arr)
      .replace(/\0/g, '');
    const { gateway_id, connection_type, connection_id, device_id } = this;

    this.ctx.service.device.findOneAndUpdate(
      {
        _id: device_id,
      },
      {
        gateway_id,
        connection_type,
        connection_id,
        device_id,
      }
    );
  }
  async decryptFrame() {
    const { chacha20poly1305_run, CC20_P1305_Mode } = require('../../src');
    const dataFrame = this.dataPacket.slice(DESIOT_FRAME.CMD_SIZE);
    const checkTag = dataFrame.subarray(
      DESIOT_FRAME.DATA_LEN_SIZE,
      DESIOT_FRAME.DATA_LEN_SIZE + DESIOT_FRAME.TAG_SIZE
    );
    const [computedTag, decryptData] = await chacha20poly1305_run(
      dataFrame,
      CC20_P1305_Mode.DECRYPT
    );

    const tagMatch = computedTag.every(
      (tagE, index) => tagE === checkTag[index]
    );
    if (tagMatch) {
      this.dataLen -= DESIOT_FRAME.TAG_SIZE;
      this.data = decryptData.slice(DESIOT_FRAME.DATA_LEN_SIZE);
      // console.log(this.data);
      this.handleSuccessFrame();
    }
  }
};
