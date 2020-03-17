import { Injectable } from '@nestjs/common';
import * as Oauth2Strategy from 'passport-oauth2';

import * as passport from 'passport';

const userObj: any = {};

@Injectable()
export class GoogleStrategy extends Oauth2Strategy {
  constructor() {
    super({
        authorizationURL: "https://accounts.google.com/o/oauth2/v2/auth",//"YOUR_AIRBUS_AUTHORIZATION_URL",
        tokenURL: "https://www.googleapis.com/oauth2/v4/token",
        clientID: "59509144128-pg5q9hffuq5uj86n0k2b46ka9mrs0c83.apps.googleusercontent.com",
        clientSecret: "D8X40u_k_hFNQDoXASM6kejP",
        callbackURL: "http://localhost:3000/auth/callback"
    }, (accessToken: string, refreshToken: string, profile: any, verified: Oauth2Strategy.VerifyCallback) => {
      return verified(null, profile);
    });
    this.name = 'oauth2'
    passport.use(this);

    passport.serializeUser((user: any, done) => {
      userObj[user.id] = user;
      done(null, user.id);
    });

    passport.deserializeUser((id: string, done) => {
      console.log("deserilixzing: ", id)
      done(null, userObj[id]);
    });

  }

  userProfile(accessToken: string, done: any) {
    this._oauth2.get('https://www.googleapis.com/oauth2/v3/userinfo', accessToken, function (err: any, body: string, res) {
      let json;
      if (err) {
        if (err.data) {
          try {
            json = JSON.parse(err.data);
          } catch (_) {}
        }
        
        if (json && json.error && json.error.message) {
          return done(new Oauth2Strategy.AuthorizationError(json.error.message, json.error.code));
        } else if (json && json.error && json.error_description) {
          return done(new Oauth2Strategy.AuthorizationError(json.error_description, json.error));
        }
        return done(new Oauth2Strategy.InternalOAuthError('Failed to fetch user profile', err));
      }

      let parse = (json) : any => {
        if ('string' == typeof json) {
          json = JSON.parse(json);
        }
        
        var profile: any = {};
        profile.id = json.sub;
        profile.displayName = json.name;
        if (json.family_name || json.given_name) {
          profile.name = { familyName: json.family_name,
                           givenName: json.given_name };
        }
        if (json.email) {
          profile.emails = [ { value: json.email, verified: json.email_verified } ];
        }
        if (json.picture) {
          profile.photos = [{ value: json.picture }];
        }
        
        return profile;
      };
      
      try {
        json = JSON.parse(body);
      } catch (ex) {
        return done(new Error('Failed to parse user profile'));
      }
      
      let profile = parse(json);
      profile.provider  = 'google';
      profile._raw = body;
      profile._json = json;
      
      done(null, profile);
    });
  }
}