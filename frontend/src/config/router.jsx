import { Outlet, createBrowserRouter } from "react-router-dom";
import { Box } from "@mui/material";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import Navbar from "../components/Navbar";
import Editor from "../pages/Editor";
import Doc from "../pages/Doc";
import MagicOptions from "../pages/MagicOptions";
import Login from "../pages/Login";
import AuthWrapper from "../components/AuthWrapper";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthWrapper>
        <Box
          sx={{
            height: "100%",
            width: "100%",
          }}
        >
          <Navbar />
          <Outlet />
        </Box>
      </AuthWrapper>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "editor",
        element: <Editor />,
      },
      {
        path: "doc",
        element: <Doc />,
      },
      {
        path: "options",
        element: <MagicOptions />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
