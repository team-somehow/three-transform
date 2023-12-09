import { createContext } from "react";

export const AppContext = createContext({
  loading: false,
  isLoggedIn: true,
  user: {
    address: "0x0Dd7D7Ad21d15A999dcc7218E7Df3F25700e696f",
    name: "Vinay Kanse",
    authProvider: "email",
    email: "vinay@gmail.com",
    publicKey: "0x0Dd7D7Ad21d15A999dcc7218E7Df3F25700e696f",
  },
});
