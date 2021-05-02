export type Method = 'all' | 'get' | 'post' | 'put' | 'patch' | 'delete';

export interface Route {
  method: Method;
  path: string;
  resolve: Function;
};