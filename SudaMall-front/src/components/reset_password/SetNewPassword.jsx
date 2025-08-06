import { useState } from "react";
import Image from "../../assets/reset_password.png";
import useKeyboardStatus from "../../hooks/useKeyboardStatus";
import { GrFormView, GrFormViewHide } from "react-icons/gr";
import api from "../../api/Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SetNewPassword = () => {
	const isKeyboardOpen = useKeyboardStatus();
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [visible, setVisible] = useState(false);
	const [passwordEqualError, setPasswordEqualError] = useState(false);
	const [passwordConditionError, setPasswordConditionError] = useState(false);

	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		if( passwordConditionError || passwordEqualError ) return;
		const email = sessionStorage.getItem("email");
		api.post("/auth/update-password/", {
			email,
			new_password: password,
		})
			.then(() => {
				toast.success("تم إرسال بريد لتفعيل حسابك");
				sessionStorage.removeItem("email");
				navigate("/auth/login");
			})
			.catch(() => {
				toast.error("حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى");
			});
	};

	const handlePassword = (e) => {
		setPassword(e.target.value);
		setPasswordConditionError(
			!/(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}/.test(e.target.value)
		);
	};
	const handleConfirmPassword = (e) => {
		setConfirmPassword(e.target.value);
		setPasswordEqualError(password !== e.target.value);
	};

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	return (
		<div className="flex flex-col justify-center items-center mt-[10px]">
			{!isKeyboardOpen && (
				<img
					src={Image}
					alt="ايقونة استعادة كلمة المرور"
					className={`w-[349px] h-[251px]`}
				/>
			)}
			<h1 className="text-[24px] mt-[15px] font-normal">
				إستعادة كلمة المرور
			</h1>

			<form
				onSubmit={handleSubmit}
				className="flex flex-col items-center gap-0"
			>
				<div className="flex flex-col p-5 mt-[20px]">
					<label htmlFor="password">أدخل كلمة المرور الجديدة</label>
					{visible ? (
						<GrFormView
							onClick={toggleVisibility}
							aria-label="إخفاء كلمة المرور"
							className="text-[40px] absolute mr-2 mt-4.5"
						/>
					) : (
						<GrFormViewHide
							onClick={toggleVisibility}
							aria-label="إظهار كلمة المرور"
							className="text-[40px] text-light-gray absolute mr-2 mt-4.5"
						/>
					)}
					<input
						dir="ltr"
						className="border-2 border-light-gray rounded-[16px] w-[320px] h-[40px] text-center px-[50px] py-[10px] mt-3 focus:outline-none"
						onChange={handlePassword}
						type={visible ? "text" : "password"}
						value={password}
						placeholder="**********"
					/>
					<div className="text-[14px] mt-1">
						{passwordConditionError && (
							<p className="text-red-500">
								كلمة المرور 8 من الارقام والاحرف الانجليزية
							</p>
						)}
					</div>
				</div>
				<div className="flex flex-col px-5">
					<label htmlFor="confirm-password">
						أعد إدخال كلمة المرور الجديدة
					</label>
					{visible ? (
						<GrFormView
							onClick={toggleVisibility}
							aria-label="إخفاء كلمة المرور"
							className="text-[40px] absolute mr-2 mt-4.5"
						/>
					) : (
						<GrFormViewHide
							onClick={toggleVisibility}
							aria-label="إظهار كلمة المرور"
							className="text-[40px] text-light-gray absolute mr-2 mt-4.5"
						/>
					)}

					<input
						dir="ltr"
						className="border-2 border-light-gray rounded-[16px] w-[320px] h-[40px] text-center px-[50px] py-[10px] mt-3 focus:outline-none"
						onChange={handleConfirmPassword}
						type={visible ? "text" : "password"}
						value={confirmPassword}
						placeholder="**********"
					/>
					<div className="text-[14px] mt-1">
						{passwordEqualError && (
							<p className="text-red-500">
								كلمات المرور غير متطابقة
							</p>
						)}
					</div>
				</div>
				<input
					type="submit"
					value="حفظ"
					className={`rounded-[16px] w-[320px] h-[40px] bg-primary text-white text-[12px] ${
						isKeyboardOpen ? "mt-[30px]" : "absolute bottom-5"
					}`}
				/>
			</form>
		</div>
	);
};

export default SetNewPassword;
