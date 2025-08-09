import { useState } from "react";
import { useSelector } from 'react-redux';
import { userData } from "../../../data/user.js"; // this will be replaced with the database data

import { ProfileHeader, ProfileStats, EditableField, LocationField, Map } from "../../../components/store-owner/profile";
import { FileUploader } from "../../../components/store-owner/reusable";
import { SelectMap } from "../../../app/AppStats";

const Profile = () => {
  const storeInfo = userData.store_info;
  const mapStat = useSelector(SelectMap);

  const [edit, setEdit] = useState({
    store_name: false,
    activity_type: false,
    store_description: false,
  });

  const [formData, setFormData] = useState({
    store_name: storeInfo.store_name,
    activity_type: storeInfo.activity_type,
    store_description: storeInfo.store_description,
    store_location: storeInfo.store_location,
    store_license: "",
  });


  const toggleEdit = (field) => {
    setEdit((prev) => ({ ...prev, [field]: true }));
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // handle submit form changes
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();

      data.append("store_license", formData.store_license);
      data.append("store_name", formData.store_license);

    console.log("form data:", formData)
  }

  return (
    <div className="container mt-8 flex flex-col gap-4 text-gray-700">
   {mapStat && <Map 
      value={formData.store_location}
      onChange={(value) => handleChange("store_location", value)}
      onSave={(locationData) => {
        handleChange("store_location", locationData.areaName);
      }}
    />}
      {/* show google map */}

      {/* store owner details */}
      <ProfileHeader user={userData} />

      {/* products and orders stats */}
      <ProfileStats products={storeInfo.products} orders={storeInfo.orders} />

      {/* edit store information */}
      <h4 className="text-base font-medium mt-2">بيانات المتجر</h4>

      <form 
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 mb-32"
        >
        <EditableField
          label="اسم المتجر"
          value={formData.store_name}
          editable={edit.store_name}
          onEdit={() => toggleEdit("store_name")}
          onChange={(e) => handleChange("store_name", e.target.value)}
        />

        <EditableField
          label="نوع النشاط"
          value={formData.activity_type}
          editable={edit.activity_type}
          onEdit={() => toggleEdit("activity_type")}
          onChange={(e) => handleChange("activity_type", e.target.value)}
        />

        <EditableField
          label="وصف المتجر"
          value={formData.store_description}
          editable={edit.store_description}
          onEdit={() => toggleEdit("store_description")}
          onChange={(e) => handleChange("store_description", e.target.value)}
        />

        {/* edit store location field */}
        <LocationField 
          value={formData.store_location}
           />

        {/* upload store license section */}
        <FileUploader
          label="مستندات توثيق المتجر"
          hint="الملفات المسموح بها: pdf, png"
          allowedTypes={["image/png", "image/jpeg"]}
          defaultFile={typeof formData.store_license !== "object" ? formData.store_license : null}
          onFileSelect={(file) => setFormData((prev) => ({ ...prev, store_license: file }))}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded-md text-xs cursor-pointer">
          حفظ التعديلات
        </button>
      </form>
    </div>
  );
};

export default Profile;
