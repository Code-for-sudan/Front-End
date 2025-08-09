import { createPortal } from "react-dom";          // for portal
import { createRoot } from "react-dom/client";    // for root rendering

const ConfirmModal = ({ message, onClose }) => {
  return createPortal(
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg text-right">
        <p className="mb-6">{message}</p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => onClose(false)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
          >
            إلغاء
          </button>
          <button
            onClick={() => onClose(true)}
            className="px-4 py-2 bg-primary text-white rounded hover:opacity-85 transition"
          >
            تأكيد
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export const ConfirmPopUp = (message) => {
  const container = document.createElement("div");
  document.body.appendChild(container);

  return new Promise((resolve) => {
    const onClose = (result) => {
      root.unmount();
      container.remove();
      resolve(result);
    };

    const root = createRoot(container);
    root.render(<ConfirmModal message={message} onClose={onClose} />);
  });
};
