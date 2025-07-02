import React, { useState } from "react";
import StepOne from "./Step1";
import StepTwo from "./Step2";
import StepThree from "./Step3";
import { registerBusiness } from "../../../api/Auth";
import { useMutation } from "@tanstack/react-query";
import { goToLogin } from "../../../hooks/navigateService";

const SignupBusiness = () => {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    storeName: "",
    storeLocation: "",
    storeType: "",
    storeDesc: "",
  });

  const mutation = useMutation({
    mutationFn: registerBusiness,

    onSuccess: () => {
      setShowSuccessPopup(true);
      setTimeout(() => {
        setShowSuccessPopup(false);
        goToLogin(); // go to login page after success
      }, 3000);
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

    if (signupInput.password !== signupInput.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "كلمتا المرور غير متطابقتين",
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
    const formData2 = {
      email: signupInput.email,
      first_name,
      last_name,
      password: signupInput.password,
      phone_number: formattedPhone,
      store_name: signupInput.storeName,
      store_location: signupInput.storeLocation,
      store_type: signupInput.storeType,
      store_desc: signupInput.storeDesc,
    };

    mutation.mutate(formData2);
  };

  return (
    <>
      {step === 1 && (
        <StepOne
          signupInput={signupInput}
          setSignupInput={setSignupInput}
          errors={errors}
          setErrors={setErrors}
          onNext={() => setStep(2)}
        />
      )}
      {step === 2 && (
        <StepTwo
          signupInput={signupInput}
          setSignupInput={setSignupInput}
          errors={errors}
          setErrors={setErrors}
          onNext={() => setStep(3)}
          onBack={() => setStep(1)}
        />
      )}
      {step === 3 && (
        <StepThree
          signupInput={signupInput}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          showSuccessPopup={showSuccessPopup}
          setShowSuccessPopup={setShowSuccessPopup}
          onBack={() => setStep(2)}
          onSubmit={() => alert("تم إنشاء الحساب!")}
          handleSubmit={handleSubmit}
          isSubmitting={mutation.isPending}
        />
      )}
    </>
  );
};

export default SignupBusiness;
