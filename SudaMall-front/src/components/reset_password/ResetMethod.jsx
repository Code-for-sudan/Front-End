import { AiOutlineMail } from "react-icons/ai";
import { ComponentsContext } from "../../pages/public/ResetPassword";
import Image from "../../assets/reset_password.png";
import { useContext } from "react";
import { FaTelegram } from "react-icons/fa";

// define a part that gives you a two options to reset password
export const ResetMethod = () => {
	const Context = useContext(ComponentsContext);

	const handleEmail = () => {
		Context.dispatch({ render: "EmailMethod" });
	};
	const handleTelegram = () => {
		Context.dispatch({ render: "TelegramMethod" });
	};

	return (
		<div className="flex flex-col justify-center items-center mt-[10px]">
			<img
				src={Image}
				alt="ايقونة استعادة كلمة المرور"
				className={`w-[375px] h-[270px]`}
			/>
			<h1 className="text-[24px] mt-[5px] font-normal">
				إستعادة كلمة المرور
			</h1>

			<div className="flex flex-col mt-[5px] text-white text-[12px] font-semibold">
				<div
					onClick={handleEmail}
					className="flex justify-center gap-x-[10px] bg-primary rounded-[12px] p-[10px] w-[181px] h-[36px]"
				>
					<AiOutlineMail className="text-[18px] text-[1000]" />
					<button className="">البريد الالكتروني</button>
				</div>
				<div
					onClick={handleTelegram}
					className="flex justify-center gap-x-[15px] bg-light-gray rounded-[12px] p-[10px] w-[181px] h-[36px] mt-[17px]"
				>
					<FaTelegram className="text-[18px] text-blue-400" />
					<button>تلجرام</button>
				</div>
			</div>
		</div>
	);
};

export default ResetMethod;
