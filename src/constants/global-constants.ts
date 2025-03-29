import { BACKEND_BASE_URL } from "../helpers/helper";

export const GlobalConstants = {
  APPLICATION_NAME: "WRITE-IT",
  BACKEND_BASE_URL: "http://localhost:8080",
  REGISTER_URL: `${BACKEND_BASE_URL}/auth/register`,
  LOGIN_URL: `${BACKEND_BASE_URL}/auth/login`,

  USER_DETAILS_KEY_FOR_LOCAL_STORAGE: "USER-DETAILS",

  JWT_TOKEN_HEADER_KEY: "jwt-token",
  JWT_TOKEN_KEY_FOR_LOCAL_STORAGE: "JWT-TOKEN",
};
