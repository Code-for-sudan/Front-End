import { useEffect, useRef, forwardRef } from "react";
import { VscSend } from "react-icons/vsc";

// forwardRef allows parent (ChatArea) to attach ref
const ChatInput = forwardRef(({ message, onChange, onSend }, ref) => {
  const textareaRef = useRef(null);

useEffect(() => {
  const textarea = textareaRef.current;
  if (!textarea) return;

  textarea.style.height = "auto"; // reset

  const lineHeight = 20;
  const maxHeight = lineHeight * 6;

  textarea.style.height =
    Math.min(textarea.scrollHeight, maxHeight) + "px";
}, [message]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div
      ref={ref}
      className="sticky bottom-0 w-full bg-white px-4 py-2 z-10 flex gap-2 items-end border-t border-gray-300"
    >
      <textarea
        ref={textareaRef}
        value={message}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="اكتب رسالتك..."
        rows={1}
        className="flex-1 resize-none overflow-y-auto hide-scrollbar px-4 py-2 border border-primary rounded-3xl text-sm placeholder:text-gray-400 outline-none"
        />
      <button
        onClick={onSend}
        className="flex items-center justify-center p-3 bg-primary rounded-full"
      >
        <VscSend className="w-5 h-5 rotate-[180deg] text-white/90" />
      </button>
    </div>
  );
});

export default ChatInput;
