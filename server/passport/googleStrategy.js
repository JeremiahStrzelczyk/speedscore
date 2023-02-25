//////////////////////////////////////////////////////////////////////////
//GoogleStrategy.js
//The following code sets up the app with OAuth authentication using
//////////////////////////////////////////////////////////////////////////
import passportGoogle from "passport-google-oauth20";
import User from "../models/User.js";

const googleStrategy = new passportGoogle.Strategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.DEPLOY_URL + "/auth/google/callback",
  },

  /*****************************************************************
   * - Construct unique id
   * - Use MongoDB `findOne()` to search collection for matching `accountData.email` that's equal to `userId`
   * - No User? Add using (asynchronous) `new User({...}).save()`, setting result to `currentUser`.
   * - Existing User? `currentUser` has user recod.
   * - `serealizeUser()` on `currentUser`
   ***************************************************************** */
  async (accessToken, refreshToken, profile, done) => {
    // console.log("User authenticated through Google. In passport callback.");
    //Our convention is to build userId from displayName and provider
    const userId = `${profile.id}@${profile.provider}`;
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
          displayName: profile.displayName,
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

export default googleStrategy;
