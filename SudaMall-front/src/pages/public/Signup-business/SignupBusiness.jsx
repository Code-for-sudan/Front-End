import React, { useState } from "react";
import StepOne from "./Step1";
import StepTwo from "./Step2";
import StepThree from "./Step3";
import { registerBusiness } from "../../../api/Auth";
import { useMutation } from "@tanstack/react-query";
import { goToLogin } from "../../../hooks/navigateService";
import { toast } from "react-toastify";

const SignupBusiness = () => {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [nameInputs, setNameInputs] = useState(["", "", "", ""]);

  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    gender: "M",
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
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,}$/
;

    if (!passwordPattern.test(updatedSignup.password)) {
      setErrors((prev) => ({
        ...prev,
        password:
          " كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل، وتشمل حروف وأرقام ورموز، ويجب أن تحتوي على حرف كبير وحرف صغير على الأقل.",
      }));
      return;
    }

    if (signupInput.password !== updatedSignup.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "كلمتا المرور غير متطابقتين",
      }));
      return;
    }
    let cleanedPhone = updatedSignup.phoneNumber.trim();
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

    // Prepare the form data
    const formData2 = {
      email: signupInput.email,
      first_name: updatedSignup.firstName,
      last_name: updatedSignup.lastName,
      gender: updatedSignup.gender,
      password: updatedSignup.password,
      phone_number: formattedPhone,
      store_name: updatedSignup.storeName,
      store_location: updatedSignup.storeLocation,
      store_type: updatedSignup.storeType,
      description: updatedSignup.storeDesc,
    };

    mutation.mutate(formData2);
  };

  return (
    <>
      {step === 1 && (
        <StepOne
          signupInput={signupInput}
          setSignupInput={setSignupInput}
          nameInputs={nameInputs}
          setNameInputs={setNameInputs}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
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
          nameInputs={nameInputs}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          showSuccessPopup={showSuccessPopup}
          setShowSuccessPopup={setShowSuccessPopup}
          onBack={() => setStep(2)}
          onSubmit={() => alert("تم إنشاء الحساب!")}
          handleSubmit={handleSubmit}
          isPending={mutation.isPending}
        />
      )}
    </>
  );
};

export default SignupBusiness;
