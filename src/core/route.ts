import { NextFunction, Request, Response } from 'express';

export type Method = 'all' | 'get' | 'post' | 'put' | 'patch' | 'delete';

export interface Route {
  method: Method;
  path: string;
  resolve: (request: Request, response: Response, next: NextFunction) => {};
};