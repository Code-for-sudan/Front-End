import { useRef, useState } from "react";

export const useFileUpload = (allowedTypes = ["application/pdf", "image/png"]) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const validateFile = (file) => {
    if (!file || !allowedTypes.includes(file.type)) {
      alert("يرجى اختيار ملف بصيغة مدعومة فقط");
      return false;
    }
    return true;
  };

  const handleFileChange = (e) => {
    const file = e.target?.files?.[0];
    if (validateFile(file)) setSelectedFile(file);
  };

  const handleDrop = (file) => {
    if (validateFile(file)) setSelectedFile(file);
  };

  return {
    selectedFile,
    setSelectedFile,
    dragActive,
    setDragActive,
    inputRef,
    handleFileChange,
    handleDrop,
  };
};
