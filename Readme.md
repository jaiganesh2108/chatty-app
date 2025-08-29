# 💬 Realtime Chat Application  

A **Realtime Chat Application** built using **React (frontend)**, **Node.js + Express (backend)**, **MongoDB (database)**, and **Socket.io (realtime messaging)** with **JWT authentication**.  

---

## 🚀 Features  
- User authentication with **JWT**  
- **Send & Receive Messages** in realtime  
- **MongoDB** for storing user & message data  
- Separate **Sender** and **Receiver** message styles  
- Responsive UI with **CSS Chat Bubbles**  
- Secure login & protected routes  

---

## 📦 Tech Stack  
- **Frontend**: React.js, Axios  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (Atlas or Local)  
- **Realtime**: Socket.io  
- **Auth**: JWT  

---

## ⚙️ Setup Instructions  

### 1. Clone the Repository  
```bash
git clone https://github.com/your-username/chat-app.git
cd chat-app
```

---


### Setup Backend
```bash
cd server
npm install
```

---

### Create a .env file inside server/ folder:
```bash
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/chatapp
JWT_SECRET=your-secret-key
```

---

### Run backend:
```bash
npm start
```

---

### Setup Frontend
```bash
cd client
npm install
npm run dev
```

---

### 📁 Project Structure
```bash 
chat-app/
│
├── client/           # React frontend
│   ├── src/
│   │   ├── components/   # Chat UI
│   │   └── App.js
│   └── package.json
│
├── server/           # Node.js backend
│   ├── models/       # MongoDB Schemas
│   ├── routes/       # API Routes
│   ├── server.js     # Express + Socket.io
│   └── package.json
│
└── README.md
```

---

📝 License

This project is licensed under the MIT License.

---
