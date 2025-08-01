import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineArrowCircleRight } from "react-icons/md";
import { VscSend } from "react-icons/vsc";
import { formatMessageTime } from "../../../utils/utilities.js";
import { ChatHistory } from "../../../data/ChatHistory.js"; // this will be deleted after connecting to the back

const ChatArea = () => {
  const [message, setMessage] = useState("");
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const owner = ChatHistory.chat_between.owner
  const user = ChatHistory.chat_between.customer;
  const messages = ChatHistory.messages;

  const navigate = useNavigate();

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isKeyboardOpen]);
  
  // resize screen size after keyboard open
  useEffect(() => {
  const handleResize = () => {
    const newHeight = window.visualViewport?.height || window.innerHeight;
    setViewportHeight(newHeight);

    const keyboardThreshold = window.innerHeight * 0.75; // tweak if needed
    setIsKeyboardOpen(newHeight < keyboardThreshold);
  };

  handleResize(); // Set initial values

  window.visualViewport?.addEventListener("resize", handleResize);
  window.addEventListener("orientationchange", handleResize);

  return () => {
    window.visualViewport?.removeEventListener("resize", handleResize);
    window.removeEventListener("orientationchange", handleResize);
  };
}, []);


  const handleSend = () => {
    if (message.trim() !== "") {
      console.log("Send message:", message);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col overflow-hidden" style={{ height: `${viewportHeight}px` }}>
      {/* Header */}
      <div className="sticky top-0 bg-white w-full flex items-center gap-4 px-6 py-4 border-b border-gray-300 z-10">
        <MdOutlineArrowCircleRight
          onClick={() => navigate(-1)}
          className="w-8 h-8 cursor-pointer"
        />
        <div className="flex items-center gap-2">
          <div className="relative">
            <img
              src={user.image_url}
              alt="profile_pic"
              className="size-10 rounded-full"
            />
            {user.online && (
              <div className="absolute bottom-0 left-0 size-3 bg-dark-green rounded-full border-2 border-white" />
            )}
          </div>
          <h4 className="text-base font-semibold">{user.name}</h4>
        </div>
      </div>

      {/* Messages */}
        <div
          className="flex-1 overflow-y-auto px-4 pt-8 overscroll-contain"
          style={{ 
            maxHeight: `${viewportHeight - 64}px`,
            touchAction: "manipulation", }}
        >
        <div className="flex flex-col">
          {messages.map((msg, i) => {
            const isOwner = msg.sender_id === owner.id;
            const prev = messages[i - 1];
            const showAvatar = !prev || prev.sender_id !== msg.sender_id;
            const gapClass =
              prev && prev.sender_id === msg.sender_id ? "mt-1" : "mt-4";

            return isOwner ? (
              <div
                key={i}
                className={`flex flex-row-reverse items-start gap-1 ${gapClass}`}
              >
                {showAvatar && (
                  <div className="relative">
                    <img
                      src={owner.image_url}
                      alt="profile"
                      className="size-6 rounded-full"
                    />
                    {owner.online && (
                      <div className="absolute -bottom-1 left-0 size-3 bg-dark-green rounded-full border-2 border-white" />
                    )}
                  </div>
                )}
                {!showAvatar && <div className="w-6" />}{" "}
                {/* Keeps alignment */}
                <div className="p-2 text-xs bg-light-gold rounded-xl max-w-[220px]">
                  <p>{msg.message}</p>
                  <p className="text-[10px] text-gray-500 text-end">
                    {formatMessageTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            ) : (
              <div key={i} className={`flex items-start gap-1 ${gapClass}`}>
                {showAvatar ? (
                  <div className="relative">
                    <img
                      src={user.image_url}
                      alt="profile"
                      className="size-6 rounded-full"
                    />
                    {user.online && (
                      <div className="absolute -bottom-1 left-0 size-3 bg-dark-green rounded-full border-2 border-white" />
                    )}
                  </div>
                ) : (
                  <div className="w-6" />
                )}
                <div className="p-2 text-xs bg-light-gray rounded-xl max-w-[220px]">
                  <p className="mb-1">{msg.message}</p>
                  <p className="text-[10px] text-gray-500 text-end">
                    {formatMessageTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div
        ref={inputRef}
        className="sticky bottom-0 w-full bg-white px-4 py-2 z-10"
      >
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="اكتب رسالتك..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 px-4 py-3 border border-primary rounded-full text-xs placeholder:text-gray-400 outline-none focus:outline-none"
          />
          <button
            onClick={handleSend}
            className="flex items-center justify-center cursor-pointer p-3 bg-primary rounded-full"
          >
            <VscSend className="w-5 h-5 rotate-[180deg] text-white/90" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;