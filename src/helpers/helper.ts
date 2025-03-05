import axios from "axios";
const BASEURL = "http://localhost:8080";
export const myaxios = axios.create({ baseURL: BASEURL });