import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import passport = require('passport');

@Injectable()
export class AuthCallbackMiddleware implements NestMiddleware {
  constructor() {
  }

  use(req: any, res: any, next: NextFunction) {
    passport.authenticate('oauth2', {'scope': 'profile'})(req, res, next);
  };
}