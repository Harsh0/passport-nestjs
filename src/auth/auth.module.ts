import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthMiddleware } from './auth.middleware';
import { AuthCallbackMiddleware } from './auth.callback.middleware';
import { GoogleStrategy } from './auth.strategy';

@Module({
  providers: [AuthService, GoogleStrategy],
  controllers: [AuthController]
})
export class AuthModule {
  public configure(consumer: MiddlewareConsumer) {

    consumer
      // Authenticate to google signin api for /auth/google route
      .apply(AuthMiddleware).forRoutes('auth/login')
      // After signin google call this endpoint
      .apply(AuthCallbackMiddleware).forRoutes('auth/callback');
  }
}
