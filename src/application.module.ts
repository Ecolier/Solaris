import express from 'express';
const debug = require('debug')('solaris');
import { DatabaseService } from './database.service';
import { SocketService } from './socket.service';
import passport from 'passport';
import { Module } from './core/module';
import { AuthenticationModule } from './authentication/authentication.module';
import { Application } from './core/application';

@Module({
  root: true,
  routes: [
    { method: 'all', path: '/user', resolve: AuthenticationModule }
  ],
  middlewares: [
    express.json(),
    passport.initialize(),
    passport.session()
  ]
})
export class ApplicationModule extends Application {

  constructor(
    private databaseService: DatabaseService,
    private socketService: SocketService) {

    super();
  }
  
}