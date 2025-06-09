import { useState } from "react";


// defines a part that let enter your email address
export const EmailMethod = () => {
    const [email, setEmail] = useState('');

    const handleEmail = (e) => {
        setEmail(e.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // api code here to send email
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

export default EmailMethod;