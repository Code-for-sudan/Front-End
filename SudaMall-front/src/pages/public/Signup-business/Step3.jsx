// src/components/RegisterSteps/StepThree.jsx
import React from "react";
import { CheckCircle } from "../../../assets/icons/index";
import PopupMessage from "../auth-components/PopupMessage";

const StepThree = ({
  signupInput,
  nameInputs,
  onBack,
  handleSubmit,
  isPending,
  errorMessage,
  showSuccessPopup,
}) => {
  return (
    <div
      className="min-h-screen flex items-start justify-center pt-20"
      style={{ backgroundColor: "var(--primary)" }}
    >
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
                placeholder="محمد علي"
                className="w-full rounded-xl px-4 py-2 border border-gray-300 text-right focus:outline-none focus:ring-2  bg-gray-100"
                style={{ "--tw-ring-color": "var(--primary)" }}
                value={`${nameInputs[0]} ${nameInputs[1]} ${nameInputs[2]} ${nameInputs[3]}`}
                disabled
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
                className="w-full rounded-xl px-4 py-2 border border-gray-300 text-right focus:outline-none focus:ring-2  bg-gray-100"
                style={{ "--tw-ring-color": "var(--primary)" }}
                value={signupInput.email}
                disabled
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
                className="w-full rounded-xl px-4 py-2 border border-gray-300 text-right focus:outline-none focus:ring-2  bg-gray-100"
                style={{ "--tw-ring-color": "var(--primary)" }}
                value={signupInput.password}
                disabled
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
                className="w-full rounded-xl px-4 py-2 border border-gray-300 text-right focus:outline-none focus:ring-2  bg-gray-100"
                style={{ "--tw-ring-color": "var(--primary)" }}
                value={signupInput.confirmPassword}
                disabled
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
                  className="flex-1 px-4 py-2 focus:outline-none text-right  bg-gray-100"
                  placeholder="XXX XXX XXXX"
                  value={signupInput.phoneNumber}
                  disabled
                />
              </div>
            </div>
            {/* Gender */}
            <div>
              <label className="block text-right font-medium mb-2">الجنس</label>
              <input
                type="text"
                className="w-full rounded-xl px-4 py-2 border border-gray-300 text-right bg-gray-100"
                value={signupInput.gender === "M" ? "ذكر" : "أنثى"}
                disabled
              />
            </div>
            {/* Store Name */}
            <div>
              <label className="block text-right font-medium mb-2">
                اسم المتجر
              </label>
              <input
                type="text"
                placeholder=""
                className="w-full rounded-xl px-4 py-2 border border-gray-300 text-right focus:outline-none focus:ring-2  bg-gray-100"
                style={{ "--tw-ring-color": "var(--primary)" }}
                value={signupInput.storeName}
                disabled
              />
            </div>

            {/* Store location  */}
            <div>
              <label className="block text-right font-medium mb-2">
                مكان المتجر
              </label>
              <input
                type="text"
                placeholder="الخرطوم - السودان"
                className="w-full rounded-xl px-4 py-2 border border-gray-300 text-right focus:outline-none focus:ring-2  bg-gray-100"
                style={{ "--tw-ring-color": "var(--primary)" }}
                value={signupInput.storeLocation}
                disabled
              />
            </div>

            {/* Store Type*/}
            <div>
              <label className="block text-right font-medium mb-2">
                نوع النشاط التجاري
              </label>
              <input
                type="text"
                placeholder="مثال: ملابس، إلكترونيات"
                className="w-full rounded-xl px-4 py-2 border border-gray-300 text-right focus:outline-none focus:ring-2  bg-gray-100"
                style={{ "--tw-ring-color": "var(--primary)" }}
                value={signupInput.storeType}
                disabled
              />
            </div>

            {/* Description Store */}
            <div>
              <label className="block text-right font-medium mb-2">
                وصف مختصر عن المتجر
              </label>
              <textarea
                rows="3"
                type="text"
                placeholder="مثال: متجر يقدم أفضل الملابس الرجالية والنسائية"
                className="w-full rounded-xl px-4 py-2 border border-gray-300 text-right focus:outline-none focus:ring-2  bg-gray-100"
                style={{ "--tw-ring-color": "var(--primary)" }}
                value={signupInput.storeDesc}
                disabled
              />
            </div>
            {/* Step indicator and continue button */}
            <div className="flex flex-col  items-center mt-12">
              <div className="flex items-center  gap-0">
                <span className="bg-yellow-500 text-white w-8 h-8 flex items-center justify-center rounded-full">
                  3
                </span>
                <div className="h-0.5 w-15 bg-gray-300"></div> {/* الخط */}
                <span className="border border-yellow-500 text-yellow-500  w-8 h-8 flex items-center justify-center rounded-full">
                  2
                </span>
                <div className="h-0.5 w-15 bg-gray-300"></div> {/* الخط */}
                <span className="border border-yellow-500 text-yellow-500  w-8 h-8 flex items-center justify-center rounded-full">
                  1
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full ">
                <button
                  type="submit"
                  className={`w-full text-white font-semibold py-2 rounded-xl transition duration-200 mt-6`}
                  style={{
                    backgroundColor: "var(--primary)",
                    hoverBackgroundColor: "var(--color-primary)",
                  }}
                  disabled={isPending}
                >
                  {isPending ? "جاري الإرسال..." : "انشاء حساب"}
                </button>

                <button
                  style={{
                    backgroundColor: "var(--primary)",
                    hoverBackgroundColor: "var(--color-primary)",
                  }}
                  className=" w-full text-white font-semibold py-2 rounded-xl transition duration-200 mt-6"
                  onClick={onBack}
                >
                  رجوع
                </button>
              </div>
            </div>
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

export default StepThree;
