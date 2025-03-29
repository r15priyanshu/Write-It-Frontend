import axios from "axios";
export const BACKEND_BASE_URL = "http://localhost:8080";
export const myaxios = axios.create({ baseURL: BACKEND_BASE_URL });
