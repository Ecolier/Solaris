import { BaseServer } from '../server';
import express from 'express';

export class ExpressServer extends BaseServer {
  private expressImplementation = express();
  constructor() {
    super();
    this.httpServer.addListener('request', this.expressImplementation);
    this.routes.subscribe(route => this.expressImplementation[route.method](route.path, route.resolve));
  }
}