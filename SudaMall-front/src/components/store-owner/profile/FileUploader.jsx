import { FiUploadCloud } from "react-icons/fi";

const FileUploader = ({ inputRef, handleFileChange, handleDrop, dragActive, setDragActive, selectedFile }) => (
  <div className="mb-3 flex flex-col gap-6">
    <label className="text-sm w-full shrink-0">مستندات توثيق المتجر</label>
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        onClick={() => inputRef.current.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          const file = e.dataTransfer.files[0];
          handleDrop(file);
        }}
        className={`w-48 h-32 border-2 ${dragActive ? "border-primary" : "border-gray-400"} border-dashed rounded-lg flex flex-col justify-center items-center cursor-pointer text-center transition hover:border-primary`}
      >
        <FiUploadCloud className="text-primary text-2xl mb-2" />
        <p className="text-xs text-gray-500 leading-relaxed">
          اسحب الملف هنا او<br />اضغط لاختيار ملف
        </p>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.png"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      {selectedFile ? (
        <p className="text-xs text-green-600">تم اختيار الملف: {selectedFile.name}</p>
      ) : (
        <p className="text-[10px] text-gray-500">المستندات المسموح بها: pdf, png</p>
      )}
    </div>
  </div>
);

export default FileUploader;