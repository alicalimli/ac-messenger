import { useContext, useEffect, useState } from "react";
import { useEditInfo } from "../hooks";

import { TwButton, InputForm } from "/src/components";


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;

const ProfileEditForm = ({email,setShowModal}) => {
	  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [password, setPassword] = useState("");

  const { editInfo, errorMsg, setErrorMsg, pendingMsg } = useEditInfo();

    const handleChangeInfo = async (e) => {
    try {
      e.preventDefault();

      if (!validUsername) return;

      await editInfo(email, username, password);
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
}


  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
    console.log(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setErrorMsg("");
  }, [username, password]);

	return (
		<form onSubmit={handleChangeInfo} className="flex flex-col gap-2 w-96">
			<h2 className="text-black dark:text-white text-xl text-center">
				Edit Information
			</h2>
			<p
				className={`text-red-600 text-md text-center ${
					errorMsg ? "visible block" : "absolute invisible"
				}`}
			>
				{errorMsg}
			</p>

			<InputForm
				label="Username"
				type="text"
				state={username}
				setState={setUsername}
				stateFocus={usernameFocus}
				setStateFocus={setUsernameFocus}
				placeHolder="e.g example123"
				isValid={validUsername}
				instruction="Must be 4 to 24 characters and begins with a letter. Hyphen and underscore are allowed"
			/>
			<InputForm
				label="Current Password"
				type="password"
				state={password}
				setState={setPassword}
				placeHolder="*********"
			/>
			<TwButton
				isDisabled={validUsername && !pendingMsg ? false : true}
				addClass="mt-4"
			>
				{pendingMsg ? pendingMsg : "Save"}
			</TwButton>
		</form>
	);
};

export default ProfileEditForm;
