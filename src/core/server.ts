import { BehaviorSubject, Subject } from 'rxjs';
import { createServer as createHttpServer } from 'http';
import { Route } from './route';

export enum State {
  Starting = 'STARTING',
  Running = 'RUNNING',
  Idle = 'IDLE'
};

export interface ActiveStatus {
  state: State;
  host: string;
  port: number;
};

export interface IdleStatus {
  state: State.Idle;
};

export type Status = ActiveStatus | IdleStatus;

export interface Server {
  readonly status: BehaviorSubject<Status>;
  readonly routes: Subject<Route>;
  start(host: string, port: number): void;
  registerRoutes(routes: Route[]): void;
  registerRoute(route: Route): void;
}

export class BaseServer implements Server {
  status = new BehaviorSubject<Status>({ state: State.Idle });
  routes = new Subject<Route>();

  readonly httpServer = createHttpServer();

  registerRoutes(routes: Route[]) {
    routes.forEach(route => this.routes.next(route));
  }

  registerRoute(route: Route) {
    this.routes.next(route);
  }

  start(host: string, port: number) {
    this.status.next({ state: State.Starting, host: host, port: port })
    this.httpServer.listen(8082, () => this.status.next({ state: State.Running, host: host, port: port }));
  }
}