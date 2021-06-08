import { NextFunction, Request, RequestHandler, Response } from "express";
import { Routable, Route } from "../core/route";
import { DatabaseService } from "../database.service";
import { SocketService } from "../socket.service";
import { UserService } from './user.service';

export class AuthenticationController implements Routable {

  private userService = new UserService(this.databaseService);

  private _routes: Route<RequestHandler>[] = [
    { path: '/login', method: 'get', action: this.login.bind(this) },
    { path: '/register', method: 'get', action: this.register.bind(this) }
  ];

  getRoutes() {
    return this._routes;
  }

  constructor(
    private databaseService: DatabaseService,
    private socketService: SocketService) {}

  login(req: Request, res: Response, next: NextFunction) {
    
  }

  register(req: Request, res: Response, next: NextFunction) {
    res.send(this.userService.createUser());
  }
}


/**
export class AuthenticationController {
  
  async register (): Promise<any> {
    
    
    
    
  }
  
  async findUser (username: string): Promise<User | void> {
    
    const result = await this.collection.findOne({
      username: username
    })
    
    if (result == null) { return }
    
    return {
      username: result.username,
      longitude: result.location?.coordinates[0] ?? 0,
      latitude: result.location?.coordinates[1] ?? 0,
      hiddenFrom: result.hiddenFrom ?? []
    }
  }
  
  async login (username: string, password: string): Promise<User | void> {
    
    const result = await this.collection.findOne({
      $and: [
        { username : username },
        { password: password },
      ]
    })
    
    if (result == null) { return }
    
    return {
      username: result.username,
      longitude: result.location?.coordinates[0] ?? 0,
      latitude: result.location?.coordinates[1] ?? 0,
      hiddenFrom: result.hiddenFrom ?? []
    }
    
  }
  
} */