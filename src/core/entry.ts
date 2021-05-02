import 'reflect-metadata';
import { ModuleOptions } from './module';
import { BaseServer } from './server';

export interface ConnectionOptions {
  host?: string;
  port?: number;
}

export interface RouteImport {
  path: string;
  module: Function;
}

export interface EntryOptions {
  server: typeof BaseServer;
  connection?: ConnectionOptions;
  import?: Function[] | RouteImport[];
}

function isRouteImport(object: any): object is RouteImport {
  return (object.path && object.module) ? true : false;
}

export function Entry(options: EntryOptions) {

  const server = new options.server();
  server.status.subscribe(status => console.log(status.state));
  server.start(options.connection?.host ?? '0.0.0.0', options.connection?.port ?? 8080);

  const imports = options.import ?? [];
  imports.forEach((imported: Function | RouteImport) => {
    if (isRouteImport(imported)) {
      const moduleMetadata = Reflect.getMetadata('__module', imported.module.prototype) as ModuleOptions;
      if (moduleMetadata.routes) {
        moduleMetadata.routes.forEach(route => server.registerRoute({
          path: `${imported.path}${route.path}`,
          method: route.method,
          resolve: route.resolve
        }))
      }
    } else {
      const moduleMetadata = Reflect.getMetadata('__module', imported.prototype) as ModuleOptions;
      if (moduleMetadata.routes) {
        server.registerRoutes(moduleMetadata.routes);
      }
    }
  });

  return function <T extends { new (...args: any[]): {} }>(constructor: T) { 
    Reflect.defineMetadata('__entry', options, constructor.prototype);
  };
}