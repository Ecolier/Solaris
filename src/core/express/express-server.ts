import { BaseServer } from '../server';
import express, { RequestHandler, Router as ExpressRouter } from 'express';
import { ActionRoute, isActionRoute, isControllerRoute, Route } from '../route';

export interface ExpressServerConnectionInfo {
  host: string;
  port: number;
}

export class ExpressServer extends BaseServer {
  private expressImplementation = express();
  constructor(connectionInfo: ExpressServerConnectionInfo) {
    super(connectionInfo);
    this.httpServer.addListener('request', this.expressImplementation);
  }
  use(route: Route<RequestHandler>) {
    if (isActionRoute(route)) {
      this.expressImplementation[route.method](route.path, route.action);
    }
    if (isControllerRoute(route)) {
      route.controller.getRoutes().forEach(subroute => {
        this.use({ ...subroute, path: `${route.path}${subroute.path}`});
      })
    }
  }
}