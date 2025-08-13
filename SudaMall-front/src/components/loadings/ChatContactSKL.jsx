const ChatContactSKL = () => {
  return (
    <div className="flex flex-col gap-2">
      {[...Array(8)].map((_, i) => (
        <div 
            key={i}
            className="flex justify-between border-b border-gray-300 px-4 py-2 animate-pulse"
            >
          <div className="flex items-center gap-3">
            {/* Profile picture placeholder */}
            <div className="relative w-16">
              <div className="size-16 rounded-full bg-gray-300" />
            </div>

            {/* Name and last message placeholders */}
            <div className="flex flex-col gap-2">
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
              <div className="h-3 w-24 bg-gray-300 rounded"></div>
            </div>
          </div>

          {/* Timestamp & unread count placeholders */}
          <div className="flex flex-col items-end justify-between py-2 text-xs">
            <div className="h-3 w-10 bg-gray-300 rounded"></div>
            <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatContactSKL;
