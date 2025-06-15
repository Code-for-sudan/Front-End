import Image from "../../assets/reset_password.png";
import { useState } from "react";
import useKeyboardStatus from "../../hooks/useKeyboardStatus";

export const TelegramMethod = () => {
	const [telegram, setTelegram] = useState("");
	const isKeyboardOpen = useKeyboardStatus();

	const handleTelegram = (e) => {
		if (e.target.value.length <= 10) setTelegram(e.target.value);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		// api code here to send telegram number
	};
	return (
		<div className="flex flex-col justify-center items-center mt-[10px]">
			<img
				src={Image}
				alt="ايقونة استعادة كلمة المرور"
				className={
					isKeyboardOpen
						? `w-[245px] h-[167px]`
						: `w-[375px] h-[275px]`
				}
			/>
			<h1 className="text-[24px] mt-[5px] font-normal">
				إستعادة كلمة المرور
			</h1>
			<div className="flex flex-col w-screen mt-[15px]">
				<h2 className="text-[16px] font-normal mr-[32px]">
					أدخل رقم التلجرام
				</h2>
				<form
					onSubmit={handleSubmit}
					className="flex flex-col text-[16px] mt-[16px] items-center"
				>
					<input
						dir="ltr"
						id="telegram-number"
						className="border-2 border-light-gray rounded-[16px] w-[320px] h-[40px] text-left px-[20px] py-[10px] pl-[60px]"
						onChange={handleTelegram}
						type="number"
						value={telegram}
						placeholder="09 XXXX XXXX"
					/>
					<label
						htmlFor="telegram-number"
						className="relative -left-[125px] -top-[32px]"
						dir="ltr"
					>
						+249 |
					</label>
					<input
						type="submit"
						value="إرسال"
						className={`rounded-[16px] w-[320px] h-[40px] bg-primary text-white text-[12px] ${
							isKeyboardOpen ? "-mt-[5px]" : "absolute bottom-5"
						}`}
					/>
				</form>
			</div>
		</div>
	);
};

export default TelegramMethod;
