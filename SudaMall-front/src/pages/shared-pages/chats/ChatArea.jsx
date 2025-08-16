import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdOutlineArrowCircleRight } from "react-icons/md";
import { formatMessageTime } from "../../../utils/utilities.js";
import { useGetChatHistory, useChatSocket } from "../../../hooks/chats";
import { TokenService } from "../../../auth/tokenService"; // assuming you have this
import { profile_pic } from "../../../assets";
import ChatInput from "../../../components/chats/ChatInput.jsx";

const ChatArea = () => {
  const params = useParams();
  const receiverId = Number(params?.contactId);
  const token = TokenService.getAccessToken(); // retrieve token from storage

  const { data: chatHistory, isLoading, isError, error } = useGetChatHistory({ receiverId });

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Connect to chat socket
  const { sendMessage } = useChatSocket({
    receiverId,
    onNewMessage: (newMsg) => {
      setMessages((prev) => [...prev, newMsg]);
    }
  });

  // Load initial history
  useEffect(() => {
    if (chatHistory?.messages) {
      setMessages(chatHistory.messages);
    }
  }, [chatHistory]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isKeyboardOpen]);

  // Handle keyboard open/close resize
  useEffect(() => {
    const handleResize = () => {
      const newHeight = window.visualViewport?.height || window.innerHeight;
      setViewportHeight(newHeight);
      const keyboardThreshold = window.innerHeight * 0.75;
      setIsKeyboardOpen(newHeight < keyboardThreshold);
    };
    handleResize();
    window.visualViewport?.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.visualViewport?.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  // Send a message
  const handleSend = () => {
    if (message.trim() === "") return;
    const tempId = sendMessage(message);

    // Optimistic UI update
    setMessages((prev) => [
      ...prev,
      {
        temp_id: tempId,
        sender: chatHistory?.chat_between?.owner?.id,
        receiver: receiverId,
        message,
        timestamp: new Date().toISOString(),
        status: "sending",
        is_read: false,
      },
    ]);
    setMessage("");
  };

  const owner = chatHistory?.chat_between?.owner || {};
  const user = chatHistory?.chat_between?.customer || {};

  return (
    <div className="flex flex-col overflow-hidden" style={{ height: `${viewportHeight}px` }}>
      {/* Header */}
      <div className="fixed top-0 bg-white w-full flex items-center gap-4 px-6 py-4 border-b border-gray-300 z-10">
        <MdOutlineArrowCircleRight
          onClick={() => navigate(-1)}
          className="w-8 h-8 cursor-pointer"
        />
        <div className="flex items-center gap-2">
          <div className="relative">
            <img
              src={user?.image_url !== null ? user.image_url : profile_pic}
              alt="profile_pic"
              className="size-10 rounded-full"
            />
            {user?.online && (
              <div className="absolute bottom-0 left-0 size-3 bg-dark-green rounded-full border-2 border-white" />
            )}
          </div>
          <h4 className="text-base font-semibold">{user.name}</h4>
        </div>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto px-4 py-8 overscroll-contain mt-14"
        style={{
          maxHeight: `${viewportHeight - 64}px`,
          touchAction: "manipulation",
        }}
      >
        <div className="flex flex-col">
          {messages.map((msg, i) => {
            const isOwner = msg.sender === owner.id;
            const prev = messages[i - 1];
            const showAvatar = !prev || prev.sender !== msg.sender;
            const gapClass = prev && prev.sender === msg.sender ? "mt-1" : "mt-4";

            return isOwner ? (
              <div
                key={msg.id || msg.temp_id || i}
                className={`flex flex-row-reverse items-start gap-1 ${gapClass}`}
              >
                {showAvatar && (
                  <div className="relative">
                    <img src={owner.image_url !== null ? owner.image_url : profile_pic} alt="profile" className="size-6 rounded-full" />
                    {owner.online && (
                      <div className="absolute -bottom-1 left-0 size-3 bg-dark-green rounded-full border-2 border-white" />
                    )}
                  </div>
                )}
                {!showAvatar && <div className="w-6" />}
                <div className="flex flex-col items-end p-2 text-xs bg-light-gold rounded-xl max-w-[220px]">
                  <p>{msg.message}</p>
                  <p className="text-[10px] text-gray-500 text-end">
                    {formatMessageTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            ) : (
              <div
                key={msg.id || msg.temp_id || i}
                className={`flex items-start gap-1 ${gapClass}`}
              >
                {showAvatar ? (
                  <div className="relative">
                    <img 
                      src={user.image_url !== null ? user.image_url : profile_pic} 
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
                <div className="flex flex-col items-end p-2 text-xs bg-light-gray rounded-xl max-w-[220px]">
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
      <ChatInput
        ref={inputRef}
        message={message}
        onChange={setMessage}
        onSend={handleSend}
      />
    </div>
  );
};

export default ChatArea;