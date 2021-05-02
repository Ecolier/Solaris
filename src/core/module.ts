import { Route } from './route';
import { Controller } from './controller';
import 'reflect-metadata';

export interface ModuleOptions {
  routes?: Route[];
  middlewares?: Function[];
  services?: Function[];
  export?: Function[];
  import?: Function[];
  declarations?: Function[];
}

export function Module(options: ModuleOptions) {

  const services = options.services ?? [];
  const declarations = options.declarations ?? [];

  services.forEach(service => {
    declarations.forEach(declaration => {
      const s = service.bind(null);
      const d = declaration.bind(null, new s());
      new d();
    })
  });

  return function <T extends { new (...args: any[]): {} }>(constructor: T) { 
    Reflect.defineMetadata('__module', options, constructor.prototype);
  };
}