const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8081"
    : "https://speedscore-api.onrender.com";

export default baseURL;
