import axios from "axios";
export const instance = axios.create({
  baseURL: import.meta.env.REACT_APP_BASE_URL || "https://ethflask-fea7.onrender.com",
});
