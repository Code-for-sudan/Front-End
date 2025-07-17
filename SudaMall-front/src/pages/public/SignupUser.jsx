import React, { useState } from "react";
import ArrowCircleRight from "../../assets/icons/ArrowCircleRight.svg";
import { useMutation } from "@tanstack/react-query";
import { signupUser } from "../../api/Auth";
import { Link } from "react-router-dom";
import { goToLogin } from "../../hooks/navigateService";
import { toast } from "react-toastify";
import { CheckCircle} from "../../assets/icons/index";
import PopupMessage from "../public/auth-components/PopupMessage";

const SignupForm = () => {
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    gender:"M",
    password: "",
    ConfirmPassword: "",
    phoneNumber: "",
  });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [errors, setErrors] = useState({});
  const { mutate, isPending } = useMutation({
    mutationFn: signupUser,
    
    onSuccess: () => {
     setShowSuccessPopup(true);
      setTimeout(() => {
      setShowSuccessPopup(false);
        goToLogin(); // go to login page after success
      }, 8000);
    },
    onError: (error) => {
      console.error("Signup Error:", error.response || error.message);
      const msg =
        error?.response?.data?.message || "حدث خطأ، الرجاء المحاولة مجددًا";
      setErrorMessage(msg);
      setTimeout(() => setErrorMessage(null), 3000);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

          const { email, password } = signupInput;
      if (!email.trim() || !password.trim()) {
        toast.error("يرجى ملء جميع الحقول");
        return;
      }
    // تقسيم الاسم الكامل إلى first_name و last_name
    const nameParts = signupInput.name.trim().split(/\s+/);
    if (nameParts.length !== 4) {
      setErrors((prev) => ({ ...prev, name: "يرجى إدخال الاسم رباعي " }));
      return;
    }
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if (!passwordPattern.test(signupInput.password)) {
      setErrors((prev) => ({
        ...prev,
        password:
          "كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل وتشمل حروف وأرقام",
      }));
      return;
    }

    if (signupInput.password !== signupInput.ConfirmPassword) {
      setErrors((prev) => ({
        ...prev,
        ConfirmPassword: "كلمتا المرور غير متطابقتين",
      }));
      return;
    }
    let cleanedPhone = signupInput.phoneNumber.trim();
    if (cleanedPhone.startsWith("0")) {
      cleanedPhone = cleanedPhone.slice(1); // remove leading zero
    }
    if (
      cleanedPhone.length < 9 ||
      cleanedPhone.length > 10 ||
      !/^\d+$/.test(cleanedPhone)
    ) {
      setErrors((prev) => ({
        ...prev,
        phoneNumber: "رقم الهاتف يجب أن يكون بين 9 إلى 10 أرقام بدون رموز",
      }));
      return;
    }
    const formattedPhone = `+249${cleanedPhone}`;

    const [first1, first2, last1, last2] = nameParts;
    const first_name = `${first1} ${first2}`;
    const last_name = `${last1} ${last2}`;

    const formData = {
      first_name,
      last_name,
      gender: signupInput.gender,
      email: signupInput.email,
      password: signupInput.password,
      phone_number: formattedPhone,
    };

    mutate(formData);
  };

  return (
    <div
      className="min-h-screen flex items-start justify-center pt-20"
      style={{ backgroundColor: "var(--primary)" }}
      dir="rtl"
    >
      <Link
        to="/auth"
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

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label className="block text-right font-medium mb-2">
                الاسم الكامل
              </label>
              <input
                type="text"
                placeholder=""
                className="w-full rounded-xl px-4 py-2 border border-gray-300 text-right focus:outline-none focus:ring-2"
                style={{ "--tw-ring-color": "var(--primary)" }}
                value={signupInput.name}
                onChange={(e) => {
                  setSignupInput({ ...signupInput, name: e.target.value });
                  setErrors({ ...errors, name: null });
                }}
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1 text-right">
                  {errors.name}
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
              <input
                type="password"
                placeholder="********"
                className="w-full rounded-xl px-4 py-2 border border-gray-300 text-right focus:outline-none focus:ring-2"
                style={{ "--tw-ring-color": "var(--primary)" }}
                value={signupInput.password}
                onChange={(e) => {
                  setSignupInput({ ...signupInput, password: e.target.value });
                  setErrors({ ...errors, password: null });
                }}
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1 text-right">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-right font-medium mb-2">
                تأكيد كلمة المرور
              </label>
              <input
                type="password"
                placeholder="********"
                className="w-full rounded-xl px-4 py-2 border border-gray-300 text-right focus:outline-none focus:ring-2"
                style={{ "--tw-ring-color": "var(--primary)" }}
                value={signupInput.ConfirmPassword}
                onChange={(e) => {
                  setSignupInput({
                    ...signupInput,
                    ConfirmPassword: e.target.value,
                  });
                  setErrors({ ...errors, ConfirmPassword: null });
                }}
              />
              {errors.ConfirmPassword && (
                <p className="text-sm text-red-500 mt-1 text-right">
                  {errors.ConfirmPassword}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block mb-1 font-medium text-right">
                رقم الهاتف
              </label>
              <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
                <span className="px-3 text-gray-500">249+</span>
                <input
                  maxLength={10}
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

            <button
              type="submit"
              disabled={isPending}
              className="w-full text-white font-semibold py-2 rounded-xl transition duration-200"
              style={{ backgroundColor: "var(--primary)" }}
            >
              {isPending? "جاري الإرسال..." : "انشاء حساب"}
            </button>

            <p className="text-center text-sm mt-4">
              هل لديك حساب بالفعل؟
              <Link
                to="/auth/login"
                className="font-semibold ml-1 mr-2.5"
                style={{ color: "var(--primary)" }}
              >
                تسجيل دخول
              </Link>
            </p>
          </form>
        </div>
      </div>
       {/* Popup للنجاح */}
 {showSuccessPopup && (
  <PopupMessage
    show={showSuccessPopup}
    icon={CheckCircle}
    title="تم إنشاء الحساب بنجاح"
    message="يرجى التحقق من البريد الإلكتروني لتفعيل الحساب."
   
  />
)}

      {/* Toast للخطأ */}
      {errorMessage && (
        <div className="fixed bottom-4 right-4 z-50 bg-red-500 text-white px-4 py-2 rounded shadow-lg">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default SignupForm;
