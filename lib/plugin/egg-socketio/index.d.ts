import { Server } from 'socket.io';
declare module 'egg' {
  interface Application {
    socketio: Server;
  }
}
