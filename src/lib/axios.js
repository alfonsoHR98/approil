import axios from "axios";

const baseURL = process.env.API_URL;

const client = axios.create({
  baseURL,
  withCredentials: true,
});

export default client;
