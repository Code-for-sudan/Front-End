import { createContext, useContext, useReducer, useState } from "react";
import Image from "../../assets/reset_password.png";
import { FaTelegram } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";

// define components context to holds changeable objects
const ComponentsContext = createContext();

// define a part that gives you a two options to reset password
const ResetMethod = () => {
	const context = useContext(ComponentsContext);

	const handleEmail = () => {
		context.dispatch({ render: "EmailMethod" });
	};
	return (
		<div className="flex flex-col mt-[101px] text-white text-[12px] font-semibold">
			<div className="flex justify-center gap-x-[10px] bg-primary rounded-[12px] p-[10px] w-[181px] h-[36px]">
				<AiOutlineMail className="text-[18px] text-[1000]" />
				<button className="" onClick={handleEmail}>
					البريد الالكتروني
				</button>
			</div>
			<div className="flex justify-center gap-x-[15px] bg-light-gray rounded-[12px] p-[10px] w-[181px] h-[36px] mt-[17px]">
				<FaTelegram className="text-[18px] text-blue-400" />
				<button>تلجرام</button>
			</div>
		</div>
	);
};

// defines a part that let enter your email address
const EmailMethod = () => {
    const [email, setEmail] = useState('');

    const handleEmail = (e) => {
        setEmail(e.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }
	return (
    <div className="flex flex-col w-screen mt-[90px]">
        <h2 className="text-[16px] font-normal mr-[32px]">أدخل بريدك الإلكتروني</h2>
        <form onSubmit={handleSubmit} className="flex flex-col text-[16px] mt-[16px] items-center">
            <input dir="ltr" className="border-2 border-light-gray rounded-[16px] w-[320px] h-[40px] text-left px-[20px] py-[10px]" onChange={handleEmail} type="email" value={email} placeholder="example@gmail.com"/>
            <input type="submit" value="إرسال" className="rounded-[16px] w-[320px] h-[40px] bg-primary text-white text-[12px] mt-[90px]" />
        </form>
        
    </div>
    );
};

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

// main reset password body page
const ResetPassword = () => {
	const [state, dispatch] = useReducer(reducers, {
		component: <ResetMethod />,
	});

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
