import { createContext } from "react";

export const AppContext = createContext({
  loading: false,
  isLoggedIn: true,
  user: {
    address:
      localStorage?.getItem("address") ||
      "0x0Dd7D7Ad21d15A999dcc7218E7Df3F25700e69",
    name: "Vinay Kanse",
    authProvider: "email",
    email: "vinay@gmail.com",
    publicKey:
      localStorage?.getItem("address") ||
      "0x0Dd7D7Ad21d15A999dcc7218E7Df3F25700e69",
  },
});
