import Image from "../../assets/reset_password.png";
import { ComponentsContext } from "../../components/ResetPasswordComponents";
import useResetPasswordComponent from "../../hooks/useResetPasswordComponent";

// main reset password body page
const ResetPassword = () => {
	const [state, dispatch] = useResetPasswordComponent();
	

	return (
		<div className="flex flex-col justify-center items-center mt-[50px]">
			<img
				src={Image}
				alt="ايقونة استعادة كلمة المرور"
				className="w-[375px] h-[270px]"
			/>
			<h1 className="text-[24px] mt-[15px] font-normal">
				إستعادة كلمة المرور
			</h1>
			<ComponentsContext.Provider value={{ state, dispatch }}>
				{state.component}
			</ComponentsContext.Provider>
		</div>
	);
};

export default ResetPassword;
