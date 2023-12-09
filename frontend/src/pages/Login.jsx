import { Auth } from "@arcana/auth-react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@arcana/auth-react";
import React from "react";

const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  React.useEffect(() => {
    if (auth.isLoggedIn && auth.user != null) {
      navigate("/");
    }
  }, [auth.isLoggedIn, auth.user, navigate]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      height="100vh"
    >
      <Auth
        externalWallet={false}
        theme="dark"
        onLogin={() => {
          navigate("/");
          console.log("Hello");
        }}
      ></Auth>
    </Box>
  );
};

export default Login;
