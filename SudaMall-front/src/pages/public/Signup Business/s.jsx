// src/components/RegisterSteps/StepTwo.jsx
import React from 'react';

const StepTwo = ({ formData, setFormData, onNext, onBack }) => {
  return (
    <div className="w-full bg-white rounded-t-3xl p-6 flex flex-col gap-4">
      <h2 className="text-right text-lg font-bold mb-2">إنشاء حساب</h2>

      <input
        type="text"
        placeholder="اسم المتجر"
        className="input-style"
        value={formData.storeName}
        onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
      />

      <input
        type="text"
        placeholder="مكان المتجر"
        className="input-style"
        value={formData.storeLocation}
        onChange={(e) => setFormData({ ...formData, storeLocation: e.target.value })}
      />

      <input
        type="text"
        placeholder="نوع النشاط التجاري"
        className="input-style"
        value={formData.storeType}
        onChange={(e) => setFormData({ ...formData, storeType: e.target.value })}
      />

      <textarea
        placeholder="وصف مختصر عن المتجر"
        className="input-style h-24"
        value={formData.storeDesc}
        onChange={(e) => setFormData({ ...formData, storeDesc: e.target.value })}
      />

      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-2">    
          <button className="step-circle">3</button>
          <button className="step-circle bg-primary text-white">2</button>
          <button className="step-circle">1</button>
        </div>
        <button className="btn-primary" onClick={onNext}>متابعة</button>
      </div>

      <button className="text-gray-500 mt-2 text-sm" onClick={onBack}>عودة</button>
    </div>
  );
};

export default StepTwo;
