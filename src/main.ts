require('dotenv').config();
import { AuthenticationController } from './user/user.controller';
import { ExpressServer } from "./core/express/express-server";
import { State } from "./core/server";
import { DatabaseService } from "./database.service"
import { SocketService } from "./socket.service";

const databaseService = new DatabaseService({
  host: 'host.docker.internal', 
  port: 27017, 
  username: 'root', 
  password: 'example', 
  dbName: 'test',
});

const expressServer = new ExpressServer({
  host: '0.0.0.0',
  port: 8082,
});

expressServer.use({
  path: '/',
  method: 'get',
  action: (req, res, next) => { res.send('hello') }
});

const socketService = new SocketService(expressServer);

expressServer.use({
  path: '/user',
  controller: new AuthenticationController(databaseService, socketService)
})

expressServer.status.subscribe(status => {
  if (status.state === State.Running) {
    console.log(`server running on ${status.host}:${status.port}`);
  }
});

expressServer.start();