import { BehaviorSubject, Subject } from 'rxjs';
import { createServer as createHttpServer } from 'http';
import { Constructor } from './types';
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
  use(route: Route): void;
  start(host: string, port: number): void;
}

export abstract class BaseServer implements Server {
  status = new BehaviorSubject<Status>({ state: State.Idle });

  readonly httpServer = createHttpServer();
  public readonly host: string;
  public readonly port: number;

  constructor(params: { host: string, port: number }) {
    this.host = params.host;
    this.port = params.port;
  }

  use(route: Route) {}

  start() {
    this.status.next({ state: State.Starting, host: this.host, port: this.port })
    this.httpServer.listen(8082, this.host, () => this.status.next({ state: State.Running, host: this.host, port: this.port }));
  }
}