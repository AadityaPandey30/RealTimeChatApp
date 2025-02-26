# 🗨️ Real-Time Chat App

A **real-time chat application** built with **FastAPI (backend)** and **Next.js (frontend)** using **WebSockets** for instant messaging.

---

## 📂 Project Structure

/RealTimeChatApp
│── /backend # FastAPI backend 
│── /frontend # Next.js frontend 
│── .gitignore # Git ignore file 
│── .env.example # Sample environment variables 
│── README.md # Project documentation

---

## 🚀 Features
- ✅ **WebSocket-powered chat** for real-time messaging  
- ✅ **Minimalist UI** with message styling and auto-scroll  
- ✅ **Automatic reconnection** on WebSocket disconnection  
- ✅ **Supports multiple users** in a shared chat room  


## Assumption
- This is an open chat room and any user can come here to chat without any authentication requirements.
  
---

## 🔧 Setup Instructions

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/AadityaPandey30/RealTimeChatApp.git
cd RealTimeChatApp
```

### 2️⃣ Set Up the Backend

```sh
cd backend
```

```sh
python -m venv .venv
source .venv/bin/activate  # macOS/Linux
.venv\Scripts\activate     # Windows
```
```sh
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 4000 --reload
```

### 3️⃣ Set Up the Frontend

```sh
cd frontend
```

```sh
npm install
```

```sh
npm run dev
```

Environment Variables
Create a .env file in both backend/ and frontend/ based on .env.example.

🔹 Backend (backend/.env)
```sh
WEBSOCKET_URL=ws://localhost:4000/ws
```

```sh
NEXT_PUBLIC_WEBSOCKET_URL=ws://localhost:4000/ws
```
