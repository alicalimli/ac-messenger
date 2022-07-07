import React, { useState } from "react";

import { Login, SignUp } from "./";

const Authentication = () => {
	const [isSigningIn, setIsSigningIn] = useState(true);

	return (
		<div>
			{isSigningIn ? (
				<Login setIsSigningIn={setIsSigningIn} />
			) : (
				<SignUp setIsSigningIn={setIsSigningIn} />
			)}
		</div>
	);
};

export default Authentication;
