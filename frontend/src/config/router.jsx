import { Outlet, createBrowserRouter } from "react-router-dom";
import { Box } from "@mui/material";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import Navbar from "../components/Navbar";
import Editor from "../pages/Editor";
import Doc from "../pages/Doc";
import MagicOptions from "../pages/MagicOptions";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Box
        sx={{
          height: "100%",
          width: "100%",
        }}
      >
        <Navbar />
        <Outlet />
      </Box>
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
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
