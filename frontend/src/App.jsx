import { RouterProvider } from "react-router-dom";
import router from "./config/router";
import StyleThemeProvider from "./theme/ThemeProvider";

function App() {
  return (
    <>
      <StyleThemeProvider>
        <RouterProvider router={router} />
      </StyleThemeProvider>
    </>
  );
}

export default App;
