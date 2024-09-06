import axios from "axios";

const baseURL = process.env.API_URL || "http://localhost:3000/api";

const client = axios.create({
  baseURL,
  withCredentials: true,
});

export default client;
