import { Module } from '../core/module';
import { DatabaseService } from '../database.service';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationMiddleware } from './authentication.middleware';

@Module({
  routes: [
    { method: 'get', path: '/register', resolve: AuthenticationController.prototype.register },
    { method: 'get', path: '/login', resolve: AuthenticationController.prototype.login }
  ],
  declarations: [
    AuthenticationController
  ],
  middlewares: [
    AuthenticationMiddleware
  ],
  services: [
    DatabaseService
  ]
})
export class AuthenticationModule {}