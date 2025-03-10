"use client";

import React, { useState, useEffect } from "react";
import WebSocketStatus from "./WebSocketStatus";
import MessageList from "./MessageList";
import { env } from "process";

const ChatBox: React.FC = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [sentMessages, setSentMessages] = useState<string[]>([]); // Track sent messages
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const WS_URL = process.env.NEXT_PUBLIC_WEBSOCKET_URL || "wss://realtimechatapp-ryr9.onrender.com/ws";

  useEffect(() => {
    const ws = new WebSocket(WS_URL);

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
    <div className="flex flex-col max-w-lg mx-auto h-[90vh] mt-10 p-5 bg-yellow-700 shadow-lg rounded-xl max-h-[600px]">
      <div className="flex justify-between pb-2 items-end">
        <h1 className="font-bold text-lg md:text-2xl text-black font-sans">Real-Time Chat App</h1>
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
          className=" text-gray-600 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full"
        />
        <button
          onClick={sendMessage}
          className="bg-yellow-400 text-black font-medium px-5 py-2 rounded-full hover:bg-yellow-500 transition-all"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
