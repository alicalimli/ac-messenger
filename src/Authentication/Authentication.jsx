import React, { useState } from "react";

import { Login, SignUp } from "./";

const Authentication = () => {
	const [isSigningIn, setIsSigningIn] = useState(true);
	return (
		{isSigningIn ? <Login setIsSigningIn={setIsSigningIn}/> : <SignUp setIsSigningIn={setIsSigningIn} />}
	);
};

export default Authentication;
