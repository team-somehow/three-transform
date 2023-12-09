import { RouterProvider } from "react-router-dom";
import router from "./config/router";
import StyleThemeProvider from "./theme/ThemeProvider";

import { AppContext } from "./context/AppContext";

const appID = "xar_test_fe9df73ff0f3ca7b5300b27720265695728c1d82";

// export const arcanaProvider = new AuthProvider(appID, {
// 	network: "testnet", //defaults to 'testnet'
// 	position: "right", //defaults to right
// 	theme: "light", //defaults to dark
// 	alwaysVisible: true, //defaults to true which is Full UI mode
// 	chainConfig: {
// 		chainId: 80001, //defaults to CHAIN.ETHEREUM_MAINNET
// 		rpcUrl: "https://polygon-rpc.com", //defaults to 'https://rpc.ankr.com/eth'
// 	},
// });

function App() {
  return (
    <>
      {/* <ProvideAuth provider={arcanaProvider}> */}
      <AppContext.Provider
        value={{
          loading: false,
          isLoggedIn: true,
          user: {
            address: "0x0Dd7D7Ad21d15A999dcc7218E7Df3F25700e696f",
            name: "Vinay Kanse",
            authProvider: "email",
            email: "vinay@gmail.com",
            publicKey: "0x0Dd7D7Ad21d15A999dcc7218E7Df3F25700e696f",
          },
        }}
      >
        <StyleThemeProvider>
          <RouterProvider router={router} />
        </StyleThemeProvider>
      </AppContext.Provider>
      {/* </ProvideAuth> */}
    </>
  );
}

export default App;
