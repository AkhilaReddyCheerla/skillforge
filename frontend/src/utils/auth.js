import { jwtDecode } from "jwt-decode";

export const setAuthData = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => localStorage.getItem("token");

export const decodeJwt = (token) => {
  return jwtDecode(token);
};

export const clearAuthData = () => {
  localStorage.removeItem("token");
};
