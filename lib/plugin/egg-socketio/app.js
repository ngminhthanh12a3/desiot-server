const { Server } = require('socket.io');

/**
 *
 * @param {Egg.Application} app
 */
module.exports = (app) => {
  app.once('server', (server) => {
    const io = new Server(server, {
      cors: {
        origin: ['http://localhost:8000'],
        credentials: true,
      },
    });
    // app.addSingleton('socketio', () => io);
    app.socketio = io;
    app.beforeStart(() => {
      app.logger.info('[egg-socketio] Socket server initialize successfully!');
    });
  });
};
