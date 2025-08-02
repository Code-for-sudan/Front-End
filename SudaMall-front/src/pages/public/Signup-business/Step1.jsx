import React from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; 
import ArrowCircleRight from "../../../assets/icons/ArrowCircleRight.svg";

const StepOne = ({ showPassword , setShowPassword,nameInputs ,setNameInputs,signupInput, setSignupInput, onNext, errors, setErrors }) => {



  return (
    <div
      className="min-h-screen flex items-start justify-center pt-20"
      style={{ backgroundColor: "var(--primary)" }}
    >
      <Link
        to="/auth?step=2"
        className="absolute top-10 left-6 text-white hover:text-gray-200"
      >
        <img src={ArrowCircleRight} alt="رجوع" className="h-8 w-8" />
      </Link>

      <div
        className="bg-white w-full max-w-md shadow-lg px-6 pt-10 pb-8"
        style={{
          borderTopLeftRadius: "80px",
          borderTopRightRadius: "80px",
          minHeight: "calc(100vh - 80px)",
        }}
      >
        <div className="container mx-auto px-4 mt-2">
          <h1 className="text-2xl font-bold text-black text-center mb-6">
            انشاء حساب جديد
          </h1>

          <form className="space-y-4">

            {/* Input: Full Name (4 fields) */}
            <div>
              <label className="block text-right font-medium mb-2">
                الاسم الكامل
              </label>
              <div className="flex gap-4">
                {[0, 1, 2, 3].map((i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={10}
                    placeholder={""}
                    value={nameInputs[i]}
                    onChange={(e) => {
                      const updated = [...nameInputs];
                      updated[i] = e.target.value;
                      setNameInputs(updated);
                    }}
                    className="w-1/4 px-3 py-2 text-right rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ))}
              </div>
              {errors.firstName && (
                <p className="text-sm text-red-500 mt-1 text-right">
                  {errors.firstName}
                </p>
              )}
              {errors.lastName && (
                <p className="text-sm text-red-500 mt-1 text-right">
                  {errors.lastName}
                </p>
              )}
            </div>

           {/* Email */}
            <div>
              <label className="block text-right font-medium mb-2">
                البريد الالكتروني
              </label>
              <input
                type="email"
                placeholder="example@gmail.com"
                className="w-full rounded-xl px-4 py-2 border border-gray-300 text-right focus:outline-none focus:ring-2"
                style={{ "--tw-ring-color": "var(--primary)" }}
                value={signupInput.email}
                onChange={(e) =>
                  setSignupInput({ ...signupInput, email: e.target.value })
                }
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-right font-medium mb-2">
                كلمة المرور
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  className="w-full rounded-xl px-4 py-2 border border-gray-300 text-right focus:outline-none focus:ring-2 pr-10"
                  style={{ "--tw-ring-color": "var(--primary)" }}
                  value={signupInput.password}
                  onChange={(e) => {
                    setSignupInput({ ...signupInput, password: e.target.value });
                    setErrors({ ...errors, password: null });
                  }}
                />
                <div
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </div>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 mt-1 text-right">
                  {errors.password}
                </p>
              )}
            </div>

           {/* Confirm password */}
            <div>
              <label className="block text-right font-medium mb-2">
                تأكيد كلمة المرور
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  className="w-full rounded-xl px-4 py-2 border border-gray-300 text-right focus:outline-none focus:ring-2 pr-10"
                  style={{ "--tw-ring-color": "var(--primary)" }}
                  value={signupInput.confirmPassword}
                  onChange={(e) => {
                    setSignupInput({
                      ...signupInput,
                      confirmPassword: e.target.value,
                    });
                    setErrors({ ...errors, confirmPassword: null });
                  }}
                />
                <div
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </div>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 mt-1 text-right">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

           {/* phone number */}
            <div>
              <label className="block mb-1 font-medium text-right">
                رقم الهاتف
              </label>
              <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
                <span className="px-3 text-gray-500">+249</span>
                <input
                  type="tel"
                  className="flex-1 px-4 py-2 focus:outline-none text-right"
                  placeholder="XXX XXX XXXX"
                  value={signupInput.phoneNumber}
                  onChange={(e) => {
                    const onlyNums = e.target.value.replace(/\D/g, "");
                    if (onlyNums.length <= 10) {
                      setSignupInput({ ...signupInput, phoneNumber: onlyNums });
                      setErrors({ ...errors, phoneNumber: null });
                    }
                  }}
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1 text-right">
                  {errors.phoneNumber}
                </p>
              )}
            </div>
              {/*determine gender */}
            <div className="mb-4">
              <label className="block mb-2 font-medium">الجنس</label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="M"
                    checked={signupInput.gender === "M"}
                    onChange={(e) =>
                      setSignupInput({ ...signupInput, gender: e.target.value })
                    }
                    style={{ accentColor: "var(--primary)" }}
                  />
                  <span>ذكر</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="F"
                    checked={signupInput.gender === "F"}
                    onChange={(e) =>
                      setSignupInput({ ...signupInput, gender: e.target.value })
                    }
                    style={{ accentColor: "var(--primary)" }}
                  />
                  <span>أنثى</span>
                </label>
              </div>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1 text-right">
                  {errors.gender}
                </p>
              )}
            </div>


           {/* Step indicator and continue button */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-0">
                <span className="border border-yellow-500 text-yellow-500 w-8 h-8 flex items-center justify-center rounded-full">
                  3
                </span>
                <div className="h-0.5 w-15 bg-gray-300"></div>
                <span className="border border-yellow-500 text-yellow-500 w-8 h-8 flex items-center justify-center rounded-full">
                  2
                </span>
                <div className="h-0.5 w-15 bg-gray-300"></div>
                <span className="bg-yellow-500 text-white w-8 h-8 flex items-center justify-center rounded-full">
                  1
                </span>
              </div>

              <button
                className="w-full text-white font-semibold py-2 rounded-xl transition duration-200 mt-6"
                style={{
                  backgroundColor: "var(--primary)",
                  hoverBackgroundColor: "var(--color-primary)",
                }}
                type="button"
                onClick={onNext}
              >
                متابعة
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StepOne;
