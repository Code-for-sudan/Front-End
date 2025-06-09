import { useReducer } from "react";
import ResetMethod from "../components/reset_password/ResetMethod";
import EmailMethod from "../components/reset_password/EmailMethod";

// create reducers functions to manage components rendering across different functions
const reducers = (state, action) => {
	switch (action.render) {
		case "ResetMethod":
			return { component: <ResetMethod /> };
		case "EmailMethod":
			return { component: <EmailMethod /> };
		default:
			throw new Error("you dispatched unfound component.");
	}
};

const useResetPasswordComponent = () => {
    const [state, dispatch] = useReducer(reducers, {
	component: <ResetMethod />,
});
    return [ state, dispatch ];
}

export default useResetPasswordComponent;