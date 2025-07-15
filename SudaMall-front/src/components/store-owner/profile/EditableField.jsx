import { PiPencilSimple } from "react-icons/pi";

const EditableField = ({ label, value, editable, onEdit, onChange }) => (
  <div className="mb-3 flex flex-col gap-2">
    <label className="text-sm w-32 shrink-0">{label}</label>
    <div className="w-full flex items-center justify-between border border-gray-300 rounded p-2 text-xs">
      <input
        type="text"
        className={`w-full ${editable ? "text-black" : "text-gray-400"} focus:outline-none`}
        value={value}
        disabled={!editable}
        onChange={onChange}
      />
      <button type="button" onClick={onEdit} className="cursor-pointer">
        <PiPencilSimple className="size-4" />
      </button>
    </div>
  </div>
);

export default EditableField;