import axios from "axios";
import jwt from "jsonwebtoken";

export const GATEWAY_URL =
  process.env.REACT_APP_NODE_ENV === "production"
    ? "https://we-be-we-day-memorys-projects.vercel.app"
    : "http://localhost:8000";

const http = axios.create({ baseURL: GATEWAY_URL });

const secretKey = process.env.REACT_APP_SECRET_KEY

const payload = {
  user_id: "19.08.2024",
  username: "wedding_guest",
  email: "test@gmail.com",
  role: "guest",
  exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour expiration
};

http.interceptors.request.use(
  async (config) => {
    const token = jwt.sign(payload, secretKey, { algorithm: "HS256" });

    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    config.headers["Access-Control-Allow-Origin"] =  "*";

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
