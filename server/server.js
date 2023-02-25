//////////////////////////////////////////////////////////////////////////
//IMPORTS AND VARIABLE INITIALIZATIONS
//The following code imports necessary dependencies and initializes
//variables used in the server middleware.
//////////////////////////////////////////////////////////////////////////
//import path from 'path';
import { fileURLToPath, URL } from "url";
import express from "express";
import passportConfig from "./passport/config.js";
import authRoute from "./routes/authRoutes.js";
import userRoute from "./routes/userRoutes.js";
import roundRoute from "./routes/roundRoutes.js";
import commentRoute from "./routes/commentRoutes.js";
import postRoute from "./routes/postRoutes.js";
const PORT = process.env.PORT || process.env.LOCAL_PORT;
const app = express(); //Instantiate express app
const buildPath =
  PORT === process.env.PORT
    ? new URL("../client/build/", import.meta.url).pathname
    : new URL("../client/build/", import.meta.url).pathname.substring(1);
import mongoose from "mongoose";
//const connectStr = 'mongodb://localhost:27017/appdb'; //Local
const connectStr = process.env.MONGODB_CSTRING;

// import { slash } from "./routes/root.js";
import router from "./routes/root.js";

// CORS Imports
import cors from "cors";
import allowedOrigins from "./config/allowedOrigins.js";

// So that we can serve public files to the API
import { dirname } from "path";
import path from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use("/", express.static(path.join(__dirname, "public")));

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}
// "mongodb+srv://" +
// process.env.MONGODB_USER +
// ":" +
// process.env.MONGODB_PW +
// process.env.MONGODB_CSTRING; //Remote DB
//////////////////////////////////////////////////////////////////////////
//MONGOOSE SET-UP
//The following code sets up the app to connect to a MongoDB database
//using the mongoose library.
//////////////////////////////////////////////////////////////////////////
mongoose
  .connect(connectStr, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(
    () => {
      console.log(`Connected to ${connectStr}.`);
    },
    (err) => {
      console.error(`Error connecting to ${connectStr}: ${err}`);
    }
  );

////////////////////////////////////////////////////////
// CORS
////////////////////////////////////////////////////////
const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};
app.use(cors(corsOptions));

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header("Access-Control-Allow-Origin", req.headers.origin);
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
//   );
//   if ("OPTIONS" == req.method) {
//     res.send(200);
//   } else {
//     next();
//   }
// });

//////////////////////////////////////////////////////////////////////////
//EXPRESS SET-UP
// The following code uses express.static to serve the React app defined
//in the client/ directory at PORT.
/////////////////////////////////////////////////////////////////////////

passportConfig(app); //Configure session and passport

app
  .use("/", router)
  // .use(express.static(buildPath))
  .use(express.json({ limit: "20mb" }))
  .use(authRoute)
  .use(userRoute)
  .use(roundRoute)
  .use(commentRoute)
  .use(postRoute)
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
