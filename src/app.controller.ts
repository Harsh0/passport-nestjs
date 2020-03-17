import { Controller, Get, Req, Res, Session } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async login(@Req() req, @Res() reply, @Session() session) {
    req.res.send(JSON.stringify(req.user, null, 2));
  }
}
