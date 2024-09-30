// configuration for passport
import { Strategy, ExtractJwt } from "passport-jwt";
import { configDotenv } from "dotenv";
import passport from "passport";
import { getUserById } from "./models/usersModel.js";
configDotenv();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new Strategy(opts, async (jwt_payload, done) => {
    // get user from the database
    try {
      console.log(jwt_payload);
      const user = await getUserById(jwt_payload.user_id);
      if (!user) {
        console.log("passport error: User ID not found")
        return done(null, false);
      }
      console.log(user)
      return done(null, user);
    } catch (err) {
      console.log("err " + err)
      return done(err, false);
    }
  })
);

export default passport;
