//////////////////////////////////////////////////////////////////////////
//GithubStrategy.js
//The following code sets up the app with OAuth authentication using
//the 'github' strategy in passport.js.
//////////////////////////////////////////////////////////////////////////

import passportGithub from "passport-github";
import User from "../models/User.js";
import {} from "dotenv/config";

const githubStrategy = new passportGithub.Strategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.DEPLOY_URL + "/auth/github/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    // console.log("User authenticated through GitHub. In passport callback.");
    //Our convention is to build userId from displayName and provider
    const userId = `${profile.username}@${profile.provider}`;
    //See if document with this unique userId exists in database
    let currentUser = await User.findOne({ "accountData.id": userId });
    if (!currentUser) {
      //Add this user to the database
      currentUser = await new User({
        accountData: {
          id: userId,
          securityQuestion: "Need to fix this",
          securityAnswer: "With check for API usage",
        },
        identityData: {
          // displayName: profile.displayName,
          displayName: profile.username,
          profilePic: profile.photos[0].value,
        },
        numRounds: 0,
        buddies: [],
        speedgolfData: {
          bio: "",
          homeCourse: "",
          firstRound: "",
          personalBest: {
            strokes: "",
            minutes: "",
            course: "",
          },
          clubs: {
            driver: false,
            threeW: false,
            fourW: false,
            fiveW: false,
            hybrid: false,
            oneI: false,
            twoI: false,
            threeI: false,
            fourI: false,
            fiveI: false,
            sixI: false,
            sevenI: false,
            eightI: false,
            nineI: false,
            pw: false,
            gw: false,
            sw: false,
            lw: false,
            putter: false,
          },
          clubComments: "",
        },
        badges: {
          roundsPlayedBadge: -1,
          fastTimeBadge: -1,
          lowStrokesBadge: -1,
          streakBadge: -1,
          highScoreBadge: -1,
        },
      }).save();
    }
    return done(null, currentUser);
  }
);

export default githubStrategy;
