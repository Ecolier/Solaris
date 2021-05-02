import { createServer as createHttpServer } from 'http';
import express, { NextFunction, Request, Response } from 'express';
import { BehaviorSubject } from 'rxjs';
import { Route } from './route';
import 'reflect-metadata';

export enum ApplicationState {
  Starting,
  Running,
  Idle
};

export interface ApplicationActiveStatus {
  state: ApplicationState;
  host: string;
  port: number;
};

export interface ApplicationIdleStatus {
  state: ApplicationState.Idle;
};

export type ApplicationStatus = ApplicationActiveStatus | ApplicationIdleStatus;

export class Application {

  readonly status = new BehaviorSubject<ApplicationStatus>({ state: ApplicationState.Idle });
  readonly _applicationImplementation = express();
  readonly httpServer = createHttpServer(this._applicationImplementation);

  @Reflect.metadata('routes', []) routes!: Route[];

  constructor() {
    this.routes.forEach(route => {
      this._applicationImplementation[route.method](route.path, (req: Request, res: Response, next: NextFunction) => {
        route.resolve();
      });
    });
  }

  start(host: string, port: number) {
    this.status.next({ state: ApplicationState.Starting, host: host, port: port })
    this.httpServer.listen(8082, () => this.status.next({ state: ApplicationState.Running, host: host, port: port }));
  }
}