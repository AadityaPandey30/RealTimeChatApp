"use client";

import { useState, useEffect } from "react";
import WebSocketStatus from "./WebSocketStatus";
import MessageList from "./MessageList";

const WEBSOCKET_URL = "ws://localhost:8000/ws";  // Change if backend is hosted

const ChatBox = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const socket = new WebSocket(WEBSOCKET_URL);
    
    socket.onopen = () => setIsConnected(true);
    socket.onclose = () => setIsConnected(false);
    socket.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);  // Add new message
    };

    setWs(socket);

    return () => socket.close();  // Cleanup on unmount
  }, []);

  const sendMessage = () => {
    if (ws && message.trim() !== "") {
      ws.send(message);
      setMessage("");  // Clear input after sending
    }
  };

  return (
    <div className="chat-container">
      <WebSocketStatus isConnected={isConnected} />
      <MessageList messages={messages} />
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="message-input"
      />
      <button onClick={sendMessage} className="send-button">Send</button>
    </div>
  );
};

export default ChatBox;
