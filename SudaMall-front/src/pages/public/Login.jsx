import React from "react";
import { useState } from "react";
import { useLogin } from "../../hooks/uselogin";
import ArrowCircleRight from "../../assets/icons/ArrowCircleRight.svg";
import Divider from "./auth-components/Divider";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Link } from 'react-router-dom'; 
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate(); 
  
  const [loginInput, setLoginInput] = useState({
    email: "awqws@gmail.com",
    password: "Akram123456789",
    rememberMe: false,
  });

  const { mutate: login, isPending, isError, error } = useLogin();

 /**  const handleGoogleSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;
    fetch("http://localhost:8000/api/auth/google/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data) => console.log("Login success:", data));
  };
*/
  const handleSubmit = (e) => {
    e.preventDefault();
    login(loginInput, {
      onSuccess: (data) => {
         const userId = data?.user?.id || data?.user?._id;
         const accountType = data?.user?.accountType ;
          if (userId && accountType === "seller") {
        navigate(`/store-owner/${userId}/dashboard`); 
       
        // Redirect to the dashboard after successful login
      } else if (userId && accountType === "buyer") {
        navigate(`/customer/${userId}/dashboard`);
        }
      
      else {
        console.error("User ID not found in login response");
      }
    },
    });
  };

  return (
    <div
      className="min-h-screen flex items-start justify-center pt-20"
      style={{ backgroundColor: "var(--primary)" }}
    >
      <Link to="/auth" className="absolute top-10 left-6 text-white hover:text-gray-200">
        <img src={ArrowCircleRight} alt="رجوع" className="h-8 w-8" />
      </Link>
      <div
        className="bg-white w-full max-w-md shadow-lg px-6 pt-10 pb-8 relative"
        style={{
          borderTopLeftRadius: "80px",
          borderTopRightRadius: "80px",
          minHeight: "calc(100vh - 80px)",
        }}
      >
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
                onChange={(event) => {
                  setLoginInput({ ...loginInput, email: event.target.value });
                }}
                type="email"
                placeholder="example@gmail.com"
                className="w-full rounded-xl px-4 py-2 border border-gray-300 text-right focus:outline-none focus:ring-2"
                style={{ focusRingColor: "var(--primary)" }}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-right font-medium mb-2">
                كلمة المرور
              </label>
              <input
                value={loginInput.password}
                onChange={(event) => {
                  setLoginInput({
                    ...loginInput,
                    password: event.target.value,
                  });
                }}
                type="password"
                placeholder="********"
                className="w-full rounded-xl px-4 py-2 border border-gray-300 text-right focus:outline-none focus:ring-2"
                style={{ focusRingColor: "var(--primary)" }}
              />
              <div className="flex items-center justify-between mt-2">
                {/* Remember Me */}
                <div className="flex items-center space-x-2 space-x-reverse mt-1.5">
                  <input
                    checked={loginInput.rememberMe}
                    onChange={(event) => {
                      setLoginInput({
                        ...loginInput,
                        rememberMe: event.target.checked,
                      });
                    }}
                    type="checkbox"
                    id="remember"
                    style={{
                      accentColor: "var(--primary)",
                      borderColor: "var(--primary)",
                    }}
                    className="rounded-sm"
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
                  className="text-sm"
                  style={{ color: "var(--primary)" }}
                >
                  هل نسيت كلمة المرور؟
                </Link>
              </div>
            </div>
            {isError && <p className="text-red-500">{error.message}</p>}

             {/* Login Button */}
            <button
              type="submit"
              className="w-full text-white font-semibold py-2 rounded-xl transition duration-200 mt-10"
              style={{
                backgroundColor: "var(--primary)",
                hoverBackgroundColor: "var(--color-primary)", 
              }}
            >
              {isPending ? "جاري تسجيل الدخول..." : "تسجيل دخول"}
            </button>
          </form>

          {/* Or Divider */}
          <Divider />
          {/* Google Login 
          {typeof window !== 'undefined' && (
          <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => console.log("Login Failed")}
              useOneTap={true}
              theme="outline"
              shape="rectangular"
              text="signin_with"
              width="100%"
              locale="ar"
              ux_mode="popup"
              // Custom render
              render={({ onClick, disabled }) => (
                <button
                  onClick={onClick}
                  disabled={disabled}
                  className="w-full border border-primary py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-100"
                >
                  <img
                    src="https://www.svgrepo.com/show/355037/google.svg"
                    alt="Google"
                    className="w-5 h-5"
                  />
                  <span className="text-sm">تسجيل الدخول بواسطة قوقل</span>
                </button>
              )}
            />
          </GoogleOAuthProvider>
          )}
*/}
          {/* Signup */}
          <p className="text-center text-sm mt-8">
            ليس لديك حساب؟
            <Link
              to="/auth"
              className="font-semibold ml-1 mr-2.5"
              style={{ color: "var(--primary)" }}
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
