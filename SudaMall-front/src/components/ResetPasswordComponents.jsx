import { FaTelegram } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { createContext, useContext, useState } from "react";

// define components context to holds changeable objects
export const ComponentsContext = createContext();

// define a part that gives you a two options to reset password
export const ResetMethod = () => {
    const context = useContext(ComponentsContext);

    const handleEmail = () => {
        context.dispatch({ render: "EmailMethod" });
    };
    return (
        <div className="flex flex-col mt-[101px] text-white text-[12px] font-semibold">
            <div onClick={handleEmail} className="flex justify-center gap-x-[10px] bg-primary rounded-[12px] p-[10px] w-[181px] h-[36px]">
                <AiOutlineMail className="text-[18px] text-[1000]" />
                <button className="">
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
export const EmailMethod = () => {
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