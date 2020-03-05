import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class AuthCallbackMiddleware implements NestMiddleware {
  constructor() {
  }

  use(req: any, res: any, next: NextFunction) {
    const user = {
      name: req.user.displayName,
      photo: req.user.photo,
    };
    res.end();
  };
}