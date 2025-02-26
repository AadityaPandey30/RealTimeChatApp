import React, { useEffect, useRef } from "react";

interface MessageListProps {
  messages: string[];
  sentMessages: string[];
}

const MessageList: React.FC<MessageListProps> = ({ messages, sentMessages }) => {
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col gap-2 overflow-y-auto h-full p-1">
      {messages.map((msg, index) => {
        const isSender = sentMessages.includes(msg);

        return (
          <div
            key={index}
            className={`p-3 rounded-lg max-w-xs text-white ${
              isSender
                ? "bg-blue-500 self-end text-right rounded-br-none"
                : "bg-gray-700 self-start text-left rounded-bl-none"
            }`}
          >
            {isSender ? `You: ${msg}` : msg}
          </div>
        );
      })}

      {/* Invisible div to scroll into view */}
      <div ref={endOfMessagesRef} />
    </div>
  );
};

export default MessageList;
