import { Route } from './route';
import express, { NextFunction, Request, Response, Router } from 'express';

export function Routable<T extends { new (...args: any[]): {} }>(Base: T) {
  class Routable extends Base {

    @Reflect.metadata('routes', []) routes!: Route[];
    @Reflect.metadata('parent', undefined) parent?: Routable;

    router?: Router;

    constructor(...args: any[]) {
      super();

      if (this.parent) { 
        this.router = express.Router();
      }

      console.log(this.router);
      
      this.routes.forEach(route => {
        //this.router[route.method](route.path, (req: Request, res: Response, next: NextFunction) => route.resolve())
      })

    }

  };
  return Routable;
}