import { useState } from "react";
import { userData } from "../../../data/user.js";

import { ProfileHeader, ProfileStats, EditableField, LocationField, FileUploader } from "../../../components/store-owner/profile";
import { useFileUpload } from "../../../hooks/useFileUpload.js";

const Profile = () => {
  const storeInfo = userData.store_info;

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
  });

  const {
    selectedFile,
    dragActive,
    setDragActive,
    inputRef,
    handleFileChange,
    handleDrop,
  } = useFileUpload();

  const toggleEdit = (field) => {
    setEdit((prev) => ({ ...prev, [field]: true }));
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container mt-8 flex flex-col gap-4 text-gray-700">
      {/* store owner details */}
      <ProfileHeader user={userData} />

      {/* products and orders stats */}
      <ProfileStats products={storeInfo.products} orders={storeInfo.orders} />

      {/* edit store information */}
      <h4 className="text-base font-medium mt-2">بيانات المتجر</h4>

      <form className="flex flex-col gap-2 mb-32">
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
        <LocationField value={formData.store_location} />

        {/* upload store license section */}
        <FileUploader
          inputRef={inputRef}
          selectedFile={selectedFile}
          dragActive={dragActive}
          setDragActive={setDragActive}
          handleFileChange={handleFileChange}
          handleDrop={handleDrop}
        />
      </form>
    </div>
  );
};

export default Profile;
