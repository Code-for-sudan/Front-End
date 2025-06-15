// src/components/RegisterSteps/StepOne.jsx
import React from "react";
import { Link } from 'react-router-dom'; 
import ArrowCircleRight from "../../../assets/icons/ArrowCircleRight.svg";

const StepOne = ({ formData, setFormData, onNext }) => {
  return (
    <div
      className="min-h-screen flex items-start justify-center pt-20"
      style={{ backgroundColor: "var(--primary)" }}
    >
      <Link to="/auth" className="absolute top-10 left-6 text-white hover:text-gray-200">
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
            {/* Full Name */}
            <div>
              <label className="block text-right font-medium mb-2">
                الاسم الكامل
              </label>
              <input
                type="text"
                placeholder="محمد علي"
                className="w-full rounded-xl px-4 py-2 border border-gray-300 text-right focus:outline-none focus:ring-2"
                style={{ "--tw-ring-color": "var(--primary)" }}
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />
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
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
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
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
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
                value={formData.ConfirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, ConfirmPassword: e.target.value })
                }
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block mb-1 font-medium text-right">
                رقم الهاتف
              </label>
              <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
                <span className="px-3 text-gray-500">249+</span>
                <input
                  type="tel"
                  className="flex-1 px-4 py-2 focus:outline-none text-right"
                  placeholder="XXX XXX XXXX"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                />
              </div>
            </div>
            {/* المؤشر وزر المتابعة */}
            <div className="flex flex-col  items-center">
              <div className="flex items-center gap-0">
                <span className="border border-yellow-500 text-yellow-500 w-8 h-8 flex items-center justify-center rounded-full">
                  3
                </span>
                <div className="h-0.5 w-15 bg-gray-300"></div> {/* الخط */}
                <span className="border border-yellow-500 text-yellow-500 w-8 h-8 flex items-center justify-center rounded-full">
                  2
                </span>
                <div className="h-0.5 w-15 bg-gray-300"></div> {/* الخط */}
                <span className="bg-yellow-500 text-white w-8 h-8 flex items-center justify-center rounded-full">
                  1
                </span>
              </div>
              <button
                className=" w-full text-white font-semibold py-2 rounded-xl transition duration-200 mt-6"
                style={{
                  backgroundColor: "var(--primary)",
                  hoverBackgroundColor: "var(--color-primary)", // إذا كنت تريد لون مختلف عند hover
                }}
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
