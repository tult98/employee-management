import axios from "axios";

export const request = axios.create({
  baseURL: process.env.API_URL ?? "http://localhost:3000",
})