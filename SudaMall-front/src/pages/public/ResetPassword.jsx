import { createContext } from "react";
import useResetPasswordComponent from "../../hooks/useResetPasswordComponent";

// define components context to holds changeable objects
export const ComponentsContext = createContext();

// main reset password body page
const ResetPassword = () => {
	const [state, dispatch] = useResetPasswordComponent();

	return (
		<ComponentsContext.Provider value={{ state, dispatch }}>
			{state.component}
		</ComponentsContext.Provider>
	);
};

export default ResetPassword;
