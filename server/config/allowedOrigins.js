const allowedOrigins =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://speedscore-test-deploy.onrender.com";

export default allowedOrigins;
