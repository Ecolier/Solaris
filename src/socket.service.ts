import { Server as SocketServer, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';
import { fromEvent, Observable, Subject } from 'rxjs';
import { BaseServer } from './core/server';

export class SocketService {
  private socketServer: SocketServer;
  connect: Observable<any>;
  constructor(server: BaseServer) {
    this.socketServer = new SocketServer(server.httpServer);
    this.connect = fromEvent(this.socketServer, 'connect');
  }
}
