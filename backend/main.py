from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Depends, HTTPException
from auth import create_access_token, hash_password, authenticate_user, get_current_user, users_db, ACCESS_TOKEN_EXPIRE_MINUTES
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from typing import List

app = FastAPI()

# Store connected WebSocket clients
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket, username: str):
        await websocket.accept()
        self.active_connections.append((websocket, username))
        await self.broadcast(f"{username} joined the chat")

    async def disconnect(self, websocket: WebSocket, username: str):
        self.active_connections.remove((websocket, username))
        await self.broadcast(f"{username} left the chat")

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        for connection, _ in self.active_connections:
            await connection.send_text(message)

manager = ConnectionManager()

# WebSocket endpoint (with authentication)
@app.websocket("/ws/{token}")
async def websocket_endpoint(websocket: WebSocket, token: str):
    try:
        user = await get_current
