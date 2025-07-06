import { useContext, useEffect, useState } from "react";
import Image from "../../assets/reset_password.png";
import useKeyboardStatus from "../../hooks/useKeyboardStatus";
import { ComponentsContext } from "../../pages/public/ResetPassword";

const ValidateSentCode = () => {
	const isKeyboardOpen = useKeyboardStatus();
	const [code, setCode] = useState(["", "", "", "", "", ""]);
	const [timer, setTimer] = useState(90); // 90 seconds
	const context = useContext(ComponentsContext);

	// execute the timer when the component mounts
	useEffect(() => {
		const countdown = setInterval(() => {
			if (timer <= 0) return;

			setTimer((prev) => prev - 1);
		}, 1000);

		return () => clearInterval(countdown);
	}, [timer]);

	// handle the input change for the code
	const handleCodeChange = (e) => {
		// check if the input is a number
		if (Number.isInteger(e.target.value)) return;

		// when copying the code from the email, it will paste the code in the input
		const newCode = [...code];
		if (e.target.value.length > 1) {
			const chars = e.target.value.split("").slice(0, 6);
			if (chars.length == 6) {
				setCode(chars);
			}
			moveCursor("forward", e);
			return;
		}
		// normal input handling
		newCode[e.target.dataset.index] = e.target.value;
		setCode(newCode);

		// move focus to the next input or past one
		if (e.target.value.length > 0) moveCursor("forward", e);
		else moveCursor("backward", e);
	};

	// move the cursor to the next or previous input based on the direction
	const moveCursor = (direction, e) => {
		switch (direction) {
			case "forward":
				document
					.querySelector(
						`[data-index="${parseInt(e.target.dataset.index) + 1}"]`
					)
					.focus();
				break;
			case "backward":
				document
					.querySelector(
						`[data-index="${parseInt(e.target.dataset.index) - 1}"]`
					)
					.focus();
				break;
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// api code here to validate the sent code

		// if successful, navigate to the next step
		context.dispatch({ render: "SetNewPassword" });
	};

	return (
		<div
			className={`flex flex-col justify-center items-center ${
				isKeyboardOpen ? "mt-[100px]" : "mt-[10px]"
			}`}
		>
			{!isKeyboardOpen && (
				<img
					src={Image}
					alt="ايقونة استعادة كلمة المرور"
					className={`w-[375px] h-[270px]`}
				/>
			)}
			<h1 className="text-[24px] mt-[5px] font-normal">
				إستعادة كلمة المرور
			</h1>
			<div className="flex flex-col w-screen mt-[15px] items-center">
				<h2 className="text-[14px] font-normal mt-[15px]">
					أدخل الرمز المكون من 6 أرقام الذي تم إرساله إليك
				</h2>
				<form
					onSubmit={handleSubmit}
					className="flex flex-col text-[16px] mt-[15px] items-center"
				>
					<div className="flex gap-[10px]" dir="ltr">
						{code.map((digit, index) => (
							<input
								dir="ltr"
								className="border-2 border-primary outline-none rounded-[10px] w-[40px] h-[40px] text-center"
								onChange={handleCodeChange}
								type="number"
								data-index={index}
								key={index}
								value={digit}
							/>
						))}
					</div>
					<p className="text-[22px] text-[#484C52] mt-[15px] from-neutral-700">
						{timer / 60 < 10
							? `0${Math.floor(timer / 60)}`
							: Math.floor(timer / 60)}
						:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
					</p>

					{timer <= 0 && (
						<button className="text-primary mt-[15px]">
							إعادة إرسال الرمز
						</button>
					)}
					<input
						type="submit"
						value="إرسال"
						className={`rounded-[16px] w-[320px] h-[40px] bg-primary text-white text-[12px] ${
							isKeyboardOpen ? "mt-[30px]" : "absolute bottom-5"
						}`}
					/>
				</form>
			</div>
		</div>
	);
};

export default ValidateSentCode;
