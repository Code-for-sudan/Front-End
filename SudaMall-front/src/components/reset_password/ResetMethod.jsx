import { AiOutlineMail } from "react-icons/ai";
import { ComponentsContext } from "../../pages/public/ResetPassword";
import { useContext } from "react";
import { FaTelegram } from "react-icons/fa";

// define a part that gives you a two options to reset password
export const ResetMethod = () => {
    const Context = useContext(ComponentsContext);

    const handleEmail = () => {
        Context.dispatch({ render: "EmailMethod" });
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

export default ResetMethod;