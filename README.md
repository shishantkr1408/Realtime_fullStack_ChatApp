<div align="center">

# 💬 Real-time AI Chat App

### AI-Powered Messaging Platform with Document-Aware Intelligence

A full-stack real-time communication platform that combines human-to-human messaging with an intelligent AI assistant. Users can chat in real time, upload PDF documents, maintain persistent conversations, and interact with AI directly inside the chat interface.

<br>

![React](https://img.shields.io/badge/React-Frontend-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?logo=node.js)
![Express](https://img.shields.io/badge/Express-Framework-000000?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb)
![Socket.IO](https://img.shields.io/badge/Socket.IO-Real--Time-010101?logo=socketdotio)
![Gemini](https://img.shields.io/badge/Gemini-AI-4285F4)
![JWT](https://img.shields.io/badge/JWT-Authentication-000000)

</div>

---

# 🚀 Overview

This project is an AI-powered real-time communication platform that integrates messaging, document management, and AI assistance into a single workflow.

Users can:

- Exchange messages instantly through real-time communication.
- Maintain persistent conversation history.
- Upload PDF documents.
- Ask questions about uploaded content.
- Generate interview questions.
- Summarize information.
- Receive contextual AI responses directly inside the chat experience.

Unlike traditional AI tools that require switching between multiple applications, this platform brings communication and knowledge assistance together in one place.

---

# ✨ Key Features

## 💬 Real-Time Messaging

- Instant message delivery using Socket.IO.
- Low-latency bidirectional communication.
- Live conversation updates.
- Persistent chat storage.

## 🤖 Integrated AI Assistant

- Dedicated AI participant ("Chatty AI").
- Natural language question answering.
- Concept explanations.
- Interview question generation.
- Information summarization.

## 📄 PDF Knowledge Processing

- Upload PDF documents.
- Automatic text extraction.
- Store processed content in MongoDB.
- Use uploaded knowledge during AI conversations.

## 🔐 Authentication & Security

- JWT-based authentication.
- Secure user sessions.
- Protected application routes.

## 💾 Persistent Storage

- User management.
- Chat history storage.
- Document storage.
- Session continuity across visits.

---

# 🏗️ System Architecture

```text
┌─────────────┐
│ React Client│
└──────┬──────┘
       │
       │ HTTP + Socket.IO
       ▼
┌─────────────────────┐
│ Express + Node.js   │
└──────┬──────────────┘
       │
       ├────────────► MongoDB
       │                │
       │                ├─ Users
       │                ├─ Messages
       │                └─ Documents
       │
       └────────────► Gemini AI
                         │
                         └─ Contextual Responses
```

---

# ⚙️ Architecture Decisions

## 1. Socket.IO for Real-Time Communication

Socket.IO was selected to provide low-latency bidirectional communication and instant message delivery.

Benefits:

- Responsive user experience
- Real-time updates
- Efficient communication model
- Reduced polling overhead

---

## 2. MongoDB for Persistent Storage

MongoDB stores:

- Users
- Messages
- Document content

This allows conversations and uploaded knowledge to remain accessible across sessions.

---

## 3. AI as a First-Class Chat Participant

Instead of creating a separate AI interface, Chatty AI was implemented as a dedicated participant inside the existing messaging architecture.

Advantages:

- Consistent user experience
- Shared messaging infrastructure
- Reusable persistence layer
- Simplified integration

---

## 4. Document Processing Pipeline

PDF files follow the workflow:

```text
Upload PDF
      │
      ▼
Extract Text
      │
      ▼
Store in MongoDB
      │
      ▼
Provide Context to Gemini
      │
      ▼
Generate Intelligent Responses
```

This enables users to interact with their uploaded knowledge naturally through conversation.

---

## 5. Gemini Integration

Gemini 2.5 Flash was selected because it provides:

- Fast response generation
- Strong conversational capabilities
- Context-aware prompting
- Efficient performance for interactive chat systems

---

# 🛠️ Tech Stack

| Category | Technology |
|-----------|------------|
| Frontend | React.js |
| Styling | Tailwind CSS |
| Backend | Node.js |
| Framework | Express.js |
| Database | MongoDB Atlas |
| Real-Time Communication | Socket.IO |
| Authentication | JWT |
| AI Integration | Google Gemini 2.5 Flash |
| File Uploads | Multer |
| PDF Processing | PDF Parse |

---

# 📂 Project Structure

```text
Realtime_fullStack_ChatApp
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── socket/
│   └── package.json
│
├── README.md
└── package.json
```

---

# 📸 Screenshots

### Login Page

_Add screenshot here_

### Real-Time Chat Interface

_Add screenshot here_

### Chatty AI Interaction

_Add screenshot here_

### PDF Upload Workflow

_Add screenshot here_

---

# 🧠 What I Used AI For

AI tools were primarily used for:

- Research
- API exploration
- Debugging
- Evaluating implementation approaches
- Learning AI integration workflows

Core application architecture, authentication, database design, Socket.IO integration, frontend implementation, and feature integration were developed and adapted manually based on project requirements.

---

# 📈 Future Improvements

Given additional development time, the platform could be extended with:

## Advanced AI Features

- Vector embeddings
- Semantic search
- Retrieval-Augmented Generation (RAG)
- Conversation memory
- Multi-document retrieval

## Collaboration Features

- Shared workspaces
- Team chat rooms
- Knowledge sharing

## Platform Enhancements

- AI streaming responses
- Analytics dashboard
- Advanced search
- Mobile optimization
- Notification system

---

# 💡 Why This Project Matters

Most communication tools and AI assistants exist as separate products.

This project explores a different approach by integrating communication, knowledge management, and AI assistance into a unified conversational experience.

The result is a platform where users can collaborate, learn, retrieve information, and interact with AI without leaving the chat environment.

---

# 👨‍💻 Author

**Shishant Kumar**

Full Stack Developer | Software Engineering Enthusiast

GitHub: https://github.com/shishantkr1408

---

⭐ If you found this project interesting, consider giving it a star.
