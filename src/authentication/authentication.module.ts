import { Module } from '../core/module';
import { Router } from '../core/router';
import { AuthenticationController } from './authentication.controller';

@Module({
  routes: [
    { method: 'get', path: '/register', resolve: AuthenticationController.prototype.register },
    { method: 'get', path: '/login', resolve: AuthenticationController.prototype.login }
  ]
})
export class AuthenticationModule extends Router {}