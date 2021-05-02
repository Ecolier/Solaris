import { Route } from './route';
import 'reflect-metadata';

export interface ModuleOptions {
  root?: boolean;
  routes: Route[];
  middlewares?: Function[];
}

export function Module(options: ModuleOptions) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    Reflect.defineProperty(constructor.prototype, 'routes', { value: options.routes })
  };
}