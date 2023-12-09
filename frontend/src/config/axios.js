import axios from "axios";
export const instance = axios.create({
  baseURL: import.meta.env.REACT_APP_BASE_URL || "http://127.0.0.1:5000",
});
