import React from "react";

interface WebSocketStatusProps {
  isConnected: boolean;
}

const WebSocketStatus: React.FC<WebSocketStatusProps> = ({ isConnected }) => {
  return (
    <div className={`status ${isConnected ? "online" : "offline"}`}>
      {isConnected ? "🟢 Connected" : "🔴 Disconnected"}
    </div>
  );
};

export default WebSocketStatus;
