// src/components/RegisterSteps/StepTwo.jsx
import React from "react";

const StepTwo = ({ signupInput, setSignupInput, onNext, onBack }) => {
  return (
    <div className="min-h-screen flex items-start justify-center pt-20 bg-primary">
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
            {/* Store Name */}
            <div>
              <label className="block text-right font-medium mb-2">
                اسم المتجر
              </label>
              <input
                type="text"
                placeholder=""
                className="w-full rounded-xl px-4 py-2 border border-gray-300 text-right focus:outline-none focus:ring-2 focus:ring-primary"
                value={signupInput.storeName}
                onChange={(e) =>
                  setSignupInput({ ...signupInput, storeName: e.target.value })
                }
              />
            </div>

            {/* Store location */}
            <div>
              <label className="block text-right font-medium mb-2">
                مكان المتجر
              </label>
              <input
                type="text"
                placeholder="الخرطوم - السودان"
                className="w-full rounded-xl px-4 py-2 border border-gray-300 text-right focus:outline-none focus:ring-2 focus:ring-primary"
                value={signupInput.storeLocation}
                onChange={(e) =>
                  setSignupInput({
                    ...signupInput,
                    storeLocation: e.target.value,
                  })
                }
              />
            </div>

            {/* Store Type */}
            <div>
              <label className="block text-right font-medium mb-2">
                نوع النشاط التجاري
              </label>
              <input
                type="text"
                placeholder="مثال: ملابس، إلكترونيات"
                className="w-full rounded-xl px-4 py-2 border border-gray-300 text-right focus:outline-none focus:ring-2 focus:ring-primary"
                value={signupInput.storeType}
                onChange={(e) =>
                  setSignupInput({ ...signupInput, storeType: e.target.value })
                }
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
                className="w-full rounded-xl px-4 py-2 border border-gray-300 text-right focus:outline-none focus:ring-2 focus:ring-primary"
                value={signupInput.storeDesc}
                onChange={(e) =>
                  setSignupInput({ ...signupInput, storeDesc: e.target.value })
                }
              />
            </div>

            {/* المؤشر وزر المتابعة */}
            <div className="flex flex-col items-center mt-12">
              <div className="flex items-center gap-0">
                <span className="border border-yellow-500 text-yellow-500 w-8 h-8 flex items-center justify-center rounded-full">
                  3
                </span>
                <div className="h-0.5 w-15 bg-gray-300"></div>
                <span className="bg-yellow-500 text-white w-8 h-8 flex items-center justify-center rounded-full">
                  2
                </span>
                <div className="h-0.5 w-15 bg-gray-300"></div>
                <span className="border border-yellow-500 text-yellow-500 w-8 h-8 flex items-center justify-center rounded-full">
                  1
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full">
                <button
                  className="w-full bg-primary text-white font-semibold py-2 rounded-xl transition duration-200 mt-6 hover:opacity-90"
                  type="button"
                  onClick={onNext}
                >
                  متابعة
                </button>

                <button
                  className="w-full bg-primary text-white font-semibold py-2 rounded-xl transition duration-200 mt-6 hover:opacity-90"
                  onClick={onBack}
                >
                  رجوع
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
