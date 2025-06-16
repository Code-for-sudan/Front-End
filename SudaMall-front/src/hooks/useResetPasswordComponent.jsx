import { useReducer } from "react";
import {
	ResetMethod,
	EmailMethod,
	TelegramMethod,
	ValidateSentCode,
	SetNewPassword,
} from "../components/reset_password/index";

// create reducers functions to manage components rendering across different functions
const reducers = (state, action) => {
	switch (action.render) {
		case "ResetMethod":
			return { component: <ResetMethod /> };
		case "EmailMethod":
			return { component: <EmailMethod /> };
		case "TelegramMethod":
			return { component: <TelegramMethod /> };
		case "ValidateSentCode":
			return { component: <ValidateSentCode /> };
		case "SetNewPassword":
			return { component: <SetNewPassword /> };
		default:
			throw new Error("you dispatched unfound component.");
	}
};

const useResetPasswordComponent = () => {
	const [state, dispatch] = useReducer(reducers, {
		component: <ResetMethod />,
	});
	return [state, dispatch];
};

export default useResetPasswordComponent;
