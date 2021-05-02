import { Entry } from './core/entry';
import { ExpressServer } from './core/express/express-server';
import { AuthenticationModule } from './authentication/authentication.module';

@Entry({
  server: ExpressServer,
  connection: { port: 8082 },
  import: [
    { path: '/user', module: AuthenticationModule }
  ]
})
export class ApplicationEntry { }
