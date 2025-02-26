import React from "react";

interface MessageListProps {
  messages: string[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const userId = "me"; // Temporary unique identifier for the user

  return (
    <div className="flex flex-col gap-2">
      {messages.map((msg, index) => {
        const isSender = msg.startsWith(userId + ":"); // Identify sender

        return (
          <div
            key={index}
            className={`p-3 rounded-lg max-w-xs text-white ${
              isSender
                ? "bg-blue-500 self-end text-right" // Right-align sender messages
                : "bg-gray-700 self-start text-left" // Left-align receiver messages
            }`}
          >
            {isSender ? msg.replace(userId + ":", "You:") : msg} {/* Show "You:" only for self */}
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
