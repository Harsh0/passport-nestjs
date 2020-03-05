import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import * as passport from 'passport';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor() {
  }

  use(req: any, res: any, next: NextFunction) {
    passport.authenticate('oauth2', {scope: "email" })(req, res, next)
  }
}