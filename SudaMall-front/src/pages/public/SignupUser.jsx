import React, { useState } from "react";
import ArrowCircleRight from "../../assets/icons/ArrowCircleRight.svg";
import { useMutation } from "@tanstack/react-query";
import { signupUser } from "../../api/Auth";
import { Link } from "react-router-dom";
import { goToLogin } from "../../hooks/navigateService";
import { toast } from "react-toastify";
import { CheckCircle } from "../../assets/icons/index";
import PopupMessage from "../public/auth-components/PopupMessage";
import { Eye, EyeOff } from "lucide-react";

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [nameInputs, setNameInputs] = useState(["", "", "", ""]);
  const [signupInput, setSignupInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "M",
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
        goToLogin(); // After completion, the user is redirected to the login page.
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

    // Combine the first and second names into firstName, and the third and fourth names into lastName
    const fullFirstName =
      `${nameInputs[0].trim()} ${nameInputs[1].trim()}`.trim();
    const fullLastName =
      `${nameInputs[2].trim()} ${nameInputs[3].trim()}`.trim();

    // Create an updated copy of the data
    const updatedSignup = {
      ...signupInput,
      firstName: fullFirstName,
      lastName: fullLastName,
    };

    // Check the fields
    if (
      !updatedSignup.firstName ||
      !updatedSignup.lastName ||
      !updatedSignup.email.trim() ||
      !updatedSignup.password.trim()
    ) {
      toast.error("يرجى ملء جميع الحقول");
      return;
    }

    const passwordPattern =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(updatedSignup.password)) {
      setErrors((prev) => ({
        ...prev,
        password:
          "كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل وتشمل حروف وأرقام ورموز",
      }));
      return;
    }

    if (updatedSignup.password !== updatedSignup.ConfirmPassword) {
      setErrors((prev) => ({
        ...prev,
        ConfirmPassword: "كلمتا المرور غير متطابقتين",
      }));
      return;
    }

    let cleanedPhone = updatedSignup.phoneNumber.trim();
    if (cleanedPhone.startsWith("0")) {
      cleanedPhone = cleanedPhone.slice(1);
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
    if (!signupInput.gender) {
      setErrors((prev) => ({
        ...prev,
        gender: " يرجى تحديد الجنس",
      }));
      return;
    }

    const formattedPhone = `+249${cleanedPhone}`;

    const formData = {
      first_name: updatedSignup.firstName,
      last_name: updatedSignup.lastName,
      gender: updatedSignup.gender,
      email: updatedSignup.email,
      password: updatedSignup.password,
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
            إنشاء حساب جديد
          </h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
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
                البريد الإلكتروني
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
                  className="w-full rounded-xl px-4 py-2 border border-gray-300 text-right focus:outline-none focus:ring-2"
                  style={{ "--tw-ring-color": "var(--primary)" }}
                  value={signupInput.password}
                  onChange={(e) => {
                    setSignupInput({
                      ...signupInput,
                      password: e.target.value,
                    });
                    setErrors({ ...errors, password: null });
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
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
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
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
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full text-white font-semibold py-2 rounded-xl transition duration-200"
              style={{ backgroundColor: "var(--primary)" }}
            >
              {isPending ? "جاري الإرسال..." : "إنشاء حساب"}
            </button>

            {/* Link to Login */}
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

      {/* Success Popup */}
      {showSuccessPopup && (
        <PopupMessage
          show={showSuccessPopup}
          icon={CheckCircle}
          title="تم إنشاء الحساب بنجاح"
          message="يرجى التحقق من البريد الإلكتروني لتفعيل الحساب."
        />
      )}

      {/* Error Toast */}
      {errorMessage && (
        <div className="fixed bottom-4 right-4 z-50 bg-red-500 text-white px-4 py-2 rounded shadow-lg">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default SignupForm;
