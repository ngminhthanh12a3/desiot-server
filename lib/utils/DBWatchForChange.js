const { Application } = require('egg');
const { VStorage } = require('../../app/models');

/**
 *
 * @param {Application} app app
 */
module.exports.DBWatchForChangeSetup = (app) => {
  const { constants, DevSyncFrame } = require('../utils'); // error: undefined when put it outside.
  const pipeline = [{ $match: { operationType: 'update' } }];
  const options = {
    fullDocument: 'updateLookup',
  };
  VStorage.watch(pipeline, options).on('change', (data) => {
    const { updatedFields = {} } = data.updateDescription;
    for (const field in updatedFields) {
      if (field.match(/(data\.)([0-9a-fA-F]{24})/g)) {
        const dev_id = field.replace(/data\./g, '');
        // field match: 'data. + 24 hex chars
        const dataPacket = {
          _vs_id: data.documentKey._id,
          dev_id,
          data: updatedFields[field],
          fullDocument: data.fullDocument,
        };
        const cmd = constants.SYNCCmds.VSSync;
        const ev = data.fullDocument.user;
        app.socketio.emit(ev, { cmd, data: dataPacket });

        const devSyncFrame = new DevSyncFrame(app, dev_id, data.fullDocument);
        devSyncFrame.sendFrame();
      }
    }
  });
};
