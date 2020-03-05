import { Injectable } from '@nestjs/common';
import * as Oauth2 from 'passport-oauth2';

import * as passport from 'passport';

@Injectable()
export class AirbusStrategy extends Oauth2 {
  constructor() {
    super({
        authorizationURL: "https://accounts.google.com/o/oauth2/v2/auth",//"YOUR_AIRBUS_AUTHORIZATION_URL",
        tokenURL: "https://www.googleapis.com/oauth2/v4/token",
        clientID: "59509144128-pg5q9hffuq5uj86n0k2b46ka9mrs0c83.apps.googleusercontent.com",
        clientSecret: "D8X40u_k_hFNQDoXASM6kejP",
        callbackURL: "http://localhost:3000/auth/callback"
    }, (accessToken: string, refreshToken: string, profile: any, verified: Oauth2.VerifyCallback) => {
        console.log("userProfile: ", profile)
        const user: any = {
            email: "test@gmail.com"
          };
          return verified(null, user);
    })
    this.name = 'oauth2'
    passport.use(this);

    passport.serializeUser((user, done) => {
      done(null, user);
    });

    passport.deserializeUser((user, done) => {
      done(null, user);
    });

  }

}