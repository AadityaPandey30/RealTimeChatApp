"use client";

import React, { useState, useEffect } from "react";
import WebSocketStatus from "./WebSocketStatus";
import MessageList from "./MessageList";

const ChatBox: React.FC = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [sentMessages, setSentMessages] = useState<string[]>([]); // Track sent messages
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:4000/ws");

    ws.onopen = () => setIsConnected(true);
    ws.onclose = () => setIsConnected(false);
    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]); // Append received message
    };

    setSocket(ws);

    return () => ws.close();
  }, []);

  const sendMessage = () => {
    if (!message.trim() || !socket) return;

    socket.send(message);
    setSentMessages((prev) => [...prev, message]); // Store sent messages
    setMessage("");
  };

  return (
    <div className="flex flex-col max-w-lg mx-auto h-[90vh] mt-16 p-5 bg-gray-800 shadow-lg rounded-xl">
      <div className="flex justify-between pb-2">
        <h1>Real-Time Chat App</h1>
        <WebSocketStatus isConnected={isConnected} />
      </div>

      <div className="flex-grow overflow-y-auto p-3 bg-white text-gray-600 rounded-md shadow-inner h-96">
        <MessageList messages={messages} sentMessages={sentMessages} />
      </div>

      <div className="flex items-center gap-2 mt-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          className="flex-grow text-gray-600 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-5 py-2 rounded-full hover:bg-blue-600 transition-all"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
