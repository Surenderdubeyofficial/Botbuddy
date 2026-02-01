# ChatBuddy (Botbuddy)

A lightweight chatbot demo built with Express (backend) and React (frontend). ChatBuddy provides a simple rule-based chat API and a minimal React UI to interact with it.

---

## 🚀 Features

- Simple rule-based chatbot responses defined in the backend controller.
- Stores user and bot messages in MongoDB using Mongoose models.
- React frontend with a clean chat UI and auto-scrolling.
- Configured for local development and easy deployment.

---

## 🧭 Project Structure

- `backend/` — Express API and Mongoose models
  - `index.js` — Server entry, loads `.env`, connects to MongoDB
  - `controllers/chatbot.message.js` — Message controller and rule-based responses
  - `models/` — `User` and `Bot` Mongoose models
  - `routes/chatbot.route.js` — API route for `/bot/v1/message`
  - `.env.example` — Example env file (do **not** commit real secrets)

- `frontend/` — React app (Vite)
  - `src/component/Bot.jsx` — Chat UI and API integration

---

## ⚙️ Tech Stack

- Node.js + Express
- MongoDB (Mongoose)
- React + Vite
- Tailwind CSS (UI)

---

## 💻 Getting Started (Local)

### Prerequisites

- Node.js (18+ recommended)
- npm or yarn
- MongoDB Atlas or local MongoDB instance

### Clone the repo

```bash
git clone https://github.com/Surenderdubeyofficial/Botbuddy.git
cd Botbuddy
```

### Backend Setup

1. Install dependencies and create `.env` from the example:

```bash
cd backend
npm install
cp .env.example .env
# Edit .env and fill MONGO_URI
```

2. Start the server:

```bash
npm start
# server runs on PORT from .env (default 4002)
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
# open http://localhost:5173 (or what Vite prints)
```

---

## 🧾 API

### POST /bot/v1/message

Request JSON:

```json
{ "text": "hello" }
```

Success response (200):

```json
{
  "userMessage": "hello",
  "botMessage": "Hi, How I can help you!!"
}
```

Errors:
- 400: Text cannot be empty
- 500: Internal Server Error

---

## 📦 Database Models

- `User`:
  - `sender` ("user")
  - `text` (string)
  - `timestamp` / `createdAt` (date)

- `Bot`:
  - `text` (string)
  - `timestamp` / `createdAt` (date)

Note: Consider using Mongoose option `timestamps: true` to automatically manage creation/update times.

---

## 🧪 Development Notes & TODOs

- Improve message matching (current implementation uses exact lower-case match). Consider fuzzy match or NLP.
- Fix frontend loading state on early return (ensure `setLoading(false)` runs if user input is empty).
- Rename schema field `timstamp` → `timestamp` or enable `timestamps: true`.
- Add tests and CI (GitHub Actions recommended).

---

## 🔐 Security

- **Do not** commit `.env` or any secret tokens. `.gitignore` already excludes `.env`.
- If secrets are accidentally pushed, rotate the secret and remove it from git history using `git filter-repo` or the BFG Repo-Cleaner.

---

## 🤝 Contributing

Contributions welcome. Open issues or submit PRs. Follow standard GitHub flow: branch, commit, PR.

---

## 🧾 License

MIT — modify as needed.

---

If you want, I can also:
- update `backend` models to use `timestamps: true` and fix typos,
- apply the frontend `loading` fix,
- add basic GitHub Actions for linting.

