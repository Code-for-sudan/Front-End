import { createPortal } from "react-dom";          // for portal
import { createRoot } from "react-dom/client";    // for root rendering

const ConfirmModal = ({ message, onClose }) => {
  return createPortal(
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white text-sm rounded px-4 py-8 max-w-sm w-full shadow-lg text-right mx-6">
        <p className="mb-6">{message}</p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => onClose(true)}
            className="px-6 py-1 bg-primary border border-primary text-white rounded active:scale-90 cursor-pointer"
          >
            اااي
          </button>
          <button
            onClick={() => onClose(false)}
            className="px-6 py-1 border border-gray-800 text-gray-800 rounded active:scale-90 cursor-pointer"
          >
            لالا
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
