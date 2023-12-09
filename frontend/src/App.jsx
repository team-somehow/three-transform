import { RouterProvider } from "react-router-dom";
import router from "./config/router";
import StyleThemeProvider from "./theme/ThemeProvider";

import { ProvideAuth } from "@arcana/auth-react";
import { AuthProvider } from "@arcana/auth";

const appID = "xar_test_fe9df73ff0f3ca7b5300b27720265695728c1d82";

export const arcanaProvider = new AuthProvider(appID, {
	network: "testnet", //defaults to 'testnet'
	position: "right", //defaults to right
	theme: "light", //defaults to dark
	alwaysVisible: true, //defaults to true which is Full UI mode
	chainConfig: {
		chainId: 80001, //defaults to CHAIN.ETHEREUM_MAINNET
		rpcUrl: "https://polygon-rpc.com", //defaults to 'https://rpc.ankr.com/eth'
	},
});

function App() {
	return (
		<>
			<ProvideAuth provider={arcanaProvider}>
				<StyleThemeProvider>
					<RouterProvider router={router} />
				</StyleThemeProvider>
			</ProvideAuth>
		</>
	);
}

export default App;
