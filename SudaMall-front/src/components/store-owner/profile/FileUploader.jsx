import { FiUploadCloud } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

const FileUploader = ({
  label = "ارفق ملف",
  hint = "الملفات المسموح بها: pdf, png",
  inputRef,
  handleFileChange,
  handleDrop,
  dragActive,
  setDragActive,
  selectedFile,
  setSelectedFile,
}) => (
  <div className="mb-3 flex flex-col gap-6">
    <label className="text-sm w-full shrink-0">{label}</label>

    {selectedFile ? (
      <div className="flex items-center gap-4 px-4 py-6 bg-green-100 border border-green-600 rounded-md">
        <RxCross1 onClick={() => setSelectedFile(null)} className="cursor-pointer" />
        <div className="flex items-center gap-1">
          <IoCheckmarkCircleOutline className="text-green-600" />
          <p className="text-xs text-black">تم اختيار الملف: {selectedFile.name}</p>
        </div>
      </div>
    ) : (
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
          className={`w-48 h-32 border-2 ${
            dragActive ? "border-primary" : "border-gray-400"
          } border-dashed rounded-lg flex flex-col justify-center items-center cursor-pointer text-center transition hover:border-primary`}
        >
          <FiUploadCloud className="text-primary text-2xl mb-2" />
          <p className="text-xs text-gray-500 leading-relaxed">
            اسحب الملف هنا او<br />اضغط لاختيار ملف
          </p>
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        <p className="text-[10px] text-gray-500">{hint}</p>
      </div>
    )}
  </div>
);

export default FileUploader;
