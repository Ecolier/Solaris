import { Constructor } from "./types";

export type RouteMethod = 'all' | 'get' | 'post' | 'put' | 'patch' | 'delete';

export interface Routable<RequestHandler = Function> {
  getRoutes(): Route<RequestHandler>[];
}

export interface ActionRoute<RequestHandler = Function> {
  method: RouteMethod;
  path: string;
  action: RequestHandler;
};

export interface ControllerRoute<RequestHandler = Function> {
  path: string;
  controller: Routable<RequestHandler>;
}

export type Route<RequestHandler = Function> = ActionRoute<RequestHandler> | ControllerRoute<RequestHandler>;

export function isActionRoute(route: Route): route is ActionRoute {
  return 'action' in route;
}

export function isControllerRoute(route: Route): route is ControllerRoute {
  return 'controller' in route;
}