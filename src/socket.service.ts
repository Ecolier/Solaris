import { Server as SocketServer, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';
import { Subject } from 'rxjs';

export class SocketService {

    private socketServer?: SocketServer;
    connect = new Subject<Socket>();

    attach(httpServer: HttpServer) {
        this.socketServer = new SocketServer(httpServer);
        this.socketServer.on('connect', socket => this.connect.next(socket));
    }
}
