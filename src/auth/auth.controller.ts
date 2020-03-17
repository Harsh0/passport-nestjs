import { Controller, Get , Res, Req, Session, Redirect}  from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('login')
    async login() {

    }

    @Redirect('/', 302)
    @Get('callback')
    public async authCallback(@Req() req, @Res() reply, @Session() session) {
        if (session.redirect_target) {
            return { url: session.redirect_target }
        }
    }
}
