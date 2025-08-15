import { useContext, useState } from "react";
import Image from "../../assets/reset_password.png";
import useKeyboardStatus from "../../hooks/useKeyboardStatus";
import { ComponentsContext } from "../../pages/public/ResetPassword";
import { noAuthApi } from "../../api/Api";
import { toast } from "react-toastify";

// defines a part that let enter your email address
export const EmailMethod = () => {
	const [email, setEmail] = useState("");
	const isKeyboardOpen = useKeyboardStatus();
	const context = useContext(ComponentsContext);

	const handleEmail = (e) => {
		setEmail(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// api code here to send email
		noAuthApi.post("/auth/reset-password/request/", {
			email,
		})
			.then(() => {
				toast.success("تم إرسال رمز التحقق إلى بريدك الإلكتروني");
				context.dispatch({
					render: "ValidateSentCode",
				});
				sessionStorage.setItem("email", email);
			})
			.catch(() => {
				toast.error("حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى");
			});
	};
	
	return (
		<div className="flex flex-col justify-center items-center mt-[10px]">
			<img
				src={Image}
				alt="ايقونة استعادة كلمة المرور"
				className={
					isKeyboardOpen
						? `w-[255px] h-[167px]`
						: `w-[345px] h-[254px]`
				}
			/>
			<h1 className="text-[24px] mt-[5px] font-normal">
				إستعادة كلمة المرور
			</h1>
			<div className="flex flex-col w-screen mt-[15px]">
				<h2 className="text-[16px] font-normal mr-[32px]">
					أدخل بريدك الإلكتروني
				</h2>
				<form
					onSubmit={handleSubmit}
					className="flex flex-col text-[16px] mt-[16px] items-center"
				>
					<input
						dir="ltr"
						className="border-2 border-light-gray rounded-[16px] w-[320px] h-[40px] text-left px-[20px] py-[10px]"
						onChange={handleEmail}
						type="email"
						value={email}
						placeholder="example@gmail.com"
					/>
					<input
						type="submit"
						value="إرسال"
						className={`rounded-[16px] w-[320px] h-[40px] bg-primary text-white text-[12px] ${
							isKeyboardOpen ? "mt-[16px]" : "absolute bottom-5"
						}`}
					/>
				</form>
			</div>
		</div>
	);
};

export default EmailMethod;
