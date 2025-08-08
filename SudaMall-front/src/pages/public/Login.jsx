import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLogin } from "../../hooks/uselogin";
import ArrowCircleRight from "../../assets/icons/ArrowCircleRight.svg";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { resendVerification } from "../../api/Auth";
import { setUser } from "../../app/UserInfo";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
const [showResendMessage, setShowResendMessage] = useState(false);
const [showResendButton, setShowResendButton] = useState(false);
  const [resendEmail, setResendEmail] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const cooldownTime = 100; // seconds

  // When clicking the resend button
  const handleResend = () => {
    if (resendCooldown > 0) return; // Still in cooldown period

    resendVerification(resendEmail);
    setResendCooldown(cooldownTime); // Start countdown
  };

  // Countdown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

 useEffect(() => {
  if (showResendMessage) {
    const timer = setTimeout(() => {
      setShowResendMessage(false);
    }, 8000); // Hide after 8 seconds
    return () => clearTimeout(timer);
  }
}, [showResendMessage]);
  const { mutate: login, isPending } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = loginInput;

    if (!email.trim() || !password.trim()) {
      toast.error("يرجى ملء جميع الحقول");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("يرجى إدخال بريد إلكتروني صحيح");
      return;
    }

    login(loginInput, {
      onSuccess: (data) => {
        const userId = data?.user?.id || data?.user?._id;
        const accountType = data?.user?.account_type;
        dispatch(setUser(data?.user));
        if (userId && accountType === "seller") {
          navigate(`/store-owner/${userId}/dashboard`);
        } else if (userId && accountType === "buyer") {
          navigate(`/customer/${userId}/dashboard`);
        }
      },
      onError: (error) => {
        const message = error.response?.data?.message;
        const allowResend = error.response?.data?.resend_verification_link;

        toast.error(message || "فشل تسجيل الدخول");

         if (allowResend) {
    setShowResendMessage(true); // Display the message for a short time
    setShowResendButton(true); //Display permanently
    setResendEmail(loginInput.email);
  }
      },
    });
  };

  return (
    <div className="min-h-screen flex items-start justify-center pt-20 bg-primary">
      <Link
        to="/auth"
        className="absolute top-10 left-6 text-white hover:text-gray-200"
      >
        <img src={ArrowCircleRight} alt="رجوع" className="h-8 w-8" />
      </Link>

      <div className="bg-white w-full max-w-md shadow-lg px-6 pt-10 pb-8 relative rounded-t-[80px] min-h-[calc(100vh-80px)]">
        <div className="container mx-auto px-4 mt-2">
          <h1 className="text-2xl font-bold text-black text-center mb-6">
            تسجيل دخول
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-right font-medium mb-2">
                البريد الالكتروني
              </label>
              <input
                value={loginInput.email}
                onChange={(event) =>
                  setLoginInput({ ...loginInput, email: event.target.value })
                }
                type="email"
                placeholder="example@gmail.com"
                className="w-full rounded-xl px-4 py-2 border border-gray-300 text-right focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-right font-medium mb-2">
                كلمة المرور
              </label>
              <div className="relative">
                <input
                  value={loginInput.password}
                  onChange={(event) =>
                    setLoginInput({
                      ...loginInput,
                      password: event.target.value,
                    })
                  }
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  className="w-full rounded-xl px-4 py-2 border border-gray-300 text-right focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <div
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </div>
              </div>

              <div className="flex items-center justify-between mt-2">
                {/* Remember Me */}
                <div className="flex items-center space-x-2 space-x-reverse mt-1.5">
                  <input
                    checked={loginInput.rememberMe}
                    onChange={(event) =>
                      setLoginInput({
                        ...loginInput,
                        rememberMe: event.target.checked,
                      })
                    }
                    type="checkbox"
                    id="remember"
                    className="rounded-sm accent-primary border-primary"
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm text-gray-400 mr-2"
                  >
                    تذكرني
                  </label>
                </div>

                <Link
                  to="/auth/reset-password"
                  className="text-sm text-primary"
                >
                  هل نسيت كلمة المرور؟
                </Link>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full text-white font-semibold py-2 rounded-xl transition duration-200 mt-5 bg-primary hover:bg-primary"
            >
              {isPending ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
            </button>
          </form>

          {(showResendMessage || showResendButton) && (
  <div className="text-center mt-4">
    {showResendMessage && (
      <p className="text-red-500 mb-2">
        لم يتم تفعيل حسابك. يمكنك إعادة إرسال رابط التفعيل.
      </p>
    )}
    {showResendButton && (
      <button
        onClick={handleResend}
        disabled={resendCooldown > 0}
        className={`text-sm underline text-primary ${
          resendCooldown > 0
            ? "opacity-50 cursor-not-allowed"
            : "hover:text-blue-800"
        }`}
      >
        {resendCooldown > 0
          ? `أعد الإرسال بعد ${resendCooldown} ثانية`
          : "إعادة إرسال رابط التفعيل"}
      </button>
    )}
  </div>
)}

          {/* Or Divider */}
          {/*   <Divider />*/}

          {/* Signup */}
          <p className="text-center text-sm mt-8">
            ليس لديك حساب؟
            <Link
              to="/auth?step=2"
              className="font-semibold ml-1 mr-2.5 text-primary"
            >
              إنشاء حساب جديد
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
