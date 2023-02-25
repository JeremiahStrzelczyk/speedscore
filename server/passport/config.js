import passport from "passport";
import session from "express-session";
import githubStrategy from "./githubStrategy.js";
import googleStrategy from "./googleStrategy.js";
import localStrategy from "./localStrategy.js";
import User from "../models/User.js";

const passportConfig = (app) => {
  passport.use(githubStrategy);
  passport.use(localStrategy);
  passport.use(googleStrategy);

  passport.serializeUser((user, done) => {
    done(null, user.accountData.id);
  });

  passport.deserializeUser(async (userId, done) => {
    let thisUser;
    try {
      thisUser = await User.findOne({ "accountData.id": userId });
      // console.log(
      //   "User with id " +
      //     userId +
      //     " found in DB. User object will be available in server routes as req.user."
      // );
      done(null, thisUser);
    } catch (err) {
      done(err);
    }
  });

  app
    .use(
      session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
          secure: process.env.NODE_ENV === "development" ? false : true,
          httpOnly: process.env.NODE_ENV === "development" ? false : true,
          sameSite: process.env.NODE_ENV === "development" ? "" : "none", // Set if using CORS
          // domain: process.env.NODE_ENV === "development" ? "" : ".onrender.com",
          path: "/",
          maxAge: 1000 * 60 * 5,
        }, // 5 minutes
      })
    )

    .use(passport.initialize())
    .use(passport.session());
};

export default passportConfig;
