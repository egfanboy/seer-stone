import passport from 'passport';
import { config } from 'dotenv';
import UserModel from '../models/user';
import serializeUser from '../utils/serialize-user';

import { Strategy, ExtractJwt, StrategyOptions, VerifiedCallback } from 'passport-jwt';

config();
const options: StrategyOptions = {
  secretOrKey: process.env.SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  issuer: process.env.JWT_ISSUER,
};

passport.use(
  new Strategy(options, async (payload: any, done: VerifiedCallback) => {
    const {
      user: { id },
    } = payload;

    const user = await UserModel.findOne({ _id: id });

    if (user === null) {
      const error = new Error('No user found.');
      return done(error);
    }

    const userPayload = serializeUser(user);

    done(null, userPayload);
  })
);

export default passport.authenticate('jwt', { session: false });
