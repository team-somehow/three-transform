import React from "react";
import { Auth } from "@arcana/auth-react";
const Login = () => {
	return (
		<div>
			<Auth
				externalWallet={false}
				theme="dark"
				onLogin={() => {
					console.log("logged in");
				}}
			></Auth>
		</div>
	);
};

export default Login;
