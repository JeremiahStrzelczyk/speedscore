import mongoose from "mongoose";
import { RoundSchema } from "./Round.js";

const UserSchema = new mongoose.Schema({
  accountData: {
    id: String,
    password: String,
    securityQuestion: String,
    securityAnswer: String,
  },
  identityData: {
    displayName: String,
    profilePic: String,
  },
  numRounds: Number,
  buddies: [String],
  speedgolfData: {
    bio: String,
    homeCourse: String,
    firstRound: Date,
    personalBest: {
      strokes: Number,
      minutes: Number,
      seconds: Number,
      course: String,
    },
    clubs: {
      driver: Boolean,
      threeW: Boolean,
      fourW: Boolean,
      fiveW: Boolean,
      hybrid: Boolean,
      oneI: Boolean,
      twoI: Boolean,
      threeI: Boolean,
      fourI: Boolean,
      fiveI: Boolean,
      sixI: Boolean,
      sevenI: Boolean,
      eightI: Boolean,
      nineI: Boolean,
      pw: Boolean,
      gw: Boolean,
      sw: Boolean,
      lw: Boolean,
      putter: Boolean,
    },
    clubComments: String,
  },
  badges: {
    roundsPlayedBadge: Number,
    fastTimeBadge: Number,
    lowStrokesBadge: Number,
    streakBadge: Number,
    highScoreBadge: Number,
  },
  rounds: [RoundSchema],
});

const User = mongoose.model("User", UserSchema);
export default User;
