import React, { useState } from 'react';
import StepOne from './Step1';
import StepTwo from './Step2';
import StepThree from './Step3';
import { registerBusiness } from '../../../api/Auth';
import { useMutation } from '@tanstack/react-query';

const SignupBusiness = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    storeName: '',
    storeLocation: '',
    storeType: '',
    storeDesc: '',
  });

    const mutation = useMutation({
    mutationFn: registerBusiness,
    onSuccess: (data) => {
      alert('تم إنشاء الحساب بنجاح!');
      console.log('API response:', data);
    },
    onError: (error) => {
      alert('حدث خطأ أثناء إرسال البيانات!');
      console.error('API Error:', error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if (!passwordPattern.test(formData.password)) {
      return alert("كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل وتشمل حروف وأرقام");
    }

    if (formData.password !== formData.ConfirmPassword) {
      return alert("كلمتا المرور غير متطابقتين");
    }

    let cleanedPhone = formData.phoneNumber.trim();
    if (cleanedPhone.startsWith("0")) {
      cleanedPhone = cleanedPhone.substring(1);
    }
    const formattedPhone = `00249${cleanedPhone}`;

    const formData = {
      ...formData,
      phoneNumber: formattedPhone,
    };

    mutation.mutate(formData);
  };

  return (
    <>
      {step === 1 && (
        <StepOne
          formData={formData}
          setFormData={setFormData}
          onNext={() => setStep(2)}
        />
      )}
      {step === 2 && (
        <StepTwo
          formData={formData}
          setFormData={setFormData}
          onNext={() => setStep(3)}
          onBack={() => setStep(1)}
        />
      )}
      {step === 3 && (
        <StepThree
          formData={formData}
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
