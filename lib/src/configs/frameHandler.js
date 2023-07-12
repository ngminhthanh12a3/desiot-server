module.exports = class DESIOT_FRAME {
  static H1_DEFAULT = 0x7;
  static H2_DEFAULT = 0x17;
  static T1_DEFAULT = 0x7;
  static T2_DEFAULT = 0x17;
  //
  static H1_INDEX = 0;
  static H2_INDEX = 1;
  static CMD_INDEX = 2;
  static DT_LEN_1_INDEX = 3;
  static DT_LEN_2_INDEX = 4;
  static DATA_START_INDEX = 5;

  //
  static DT_LEN_MASK = 0x3ff;

  //
  static DATA_LEN_SIZE = 2;
  static CMD_SIZE = 1;
  static GATEWAY_ID_SIZE = 25;
  static CONFIG_ID_SIZE = 25;
  static DEVICE_ID_SIZE = 25;
  static CONNECTION_TYPE_SIZE = 1;
  static CONNECTION_ID_SIZE = 1;
  static DEV_SYNC_ADD_DATA_SIZE =
    this.CONNECTION_TYPE_SIZE + this.CONNECTION_ID_SIZE;

  static VS_ID_SIZE = 1;
  static VS_INT_DATA_SIZE = 4;
  static VS_TYPE_INT_DATA_SIZE = this.VS_ID_SIZE + this.VS_INT_DATA_SIZE;

  // CMDs
  static CMD_DEVICE_ASSIGN_VIRTUAL_STORAGE = 0;
  static CMD_SYNC_VIRTUAL_STORAGE = 1;

  // DATA POS
  static GATEWAY_ID_POS = 0;
  static CONNECTION_TYPE_POS = this.GATEWAY_ID_POS + this.GATEWAY_ID_SIZE;
  static CONNECTION_ID_POS = this.CONNECTION_TYPE_POS + 1;
  static CONFIG_ID_POS = this.CONNECTION_ID_POS + 1;
  static DEVICE_ID_POS = this.CONFIG_ID_POS + this.CONFIG_ID_SIZE; // plus config ID size.
  static MAIN_DATA_START_POS = this.DEVICE_ID_POS + this.DEVICE_ID_SIZE;

  static VS_TYPE_INT = 0;
};
