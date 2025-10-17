## UserManagement 👥🚀

A full‑stack user, team, and task management app built with NestJS + MongoDB on the backend and React (Vite) on the frontend.

- 🔐 JWT authentication (login/signup)
- ✅ Personal tasks: create, update, set in‑progress/done, delete
- 👥 Teams: create teams, add/remove members, view team tasks
- 📊 Weekly completion stats chart
- 🔔 Friendly toast notifications for actions (create/update/delete)

---

### 🧱 Tech Stack

- Backend: NestJS, Mongoose (MongoDB), JWT
- Frontend: React, Vite, TypeScript
- UI: Tailwind-esque styling (utility classes)
- Notifications: `react-hot-toast`

---

### 📁 Monorepo Structure

```
UserManagement/
  backend/                # NestJS API (MongoDB)
    src/
      auth/               # Auth module (JWT)
      tasks/              # Tasks module (CRUD + stats)
      teams/              # Teams module (members & tasks)
      users/              # Users store/service
    dist/                 # Compiled JS
    package.json
  frontend/               # React + Vite SPA
    src/
      api/                # Axios API wrappers
      pages/              # App pages (Dashboard, Tasks, Teams)
      components/         # Shared UI
    package.json
  README.md               # You are here 💡
```

---

### ⚙️ Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+
- MongoDB instance (local or cloud)

---

### 🔐 Environment Variables

Create a `.env` (or use your preferred method) for the backend with at least:

- `MONGODB_URI` 👉 your Mongo connection string
- `JWT_SECRET`  👉 matches `jwtConstants.secret`

If you don’t use `.env`, ensure `jwtConstants.secret` and your Mongoose connection in Nest are configured appropriately.

---

### 🚀 Getting Started

Install dependencies for both apps:

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

Start the servers in two terminals:

```bash
# Backend (default http://localhost:3000)
cd backend
npm run start:dev

# Frontend (default http://localhost:5173)
cd frontend
npm run dev
```

---

### 🔄 Authentication Flow

1. Signup or login to obtain `access_token` (JWT)
2. Frontend stores token in `localStorage` as `token`
3. All protected requests send `Authorization: Bearer <token>`

---

### 🧭 Key Endpoints (Backend)

Tasks (`/tasks`):
- `POST /create` — Create task (requires JWT)
- `PATCH /update/:id` — Update task (author‑guarded)
- `PATCH /set-task-status/:id` — Set status `TODO | IN_PROGRESS | DONE`
- `GET /user/:username` — List a user’s tasks
- `GET /team/:team` — List tasks by team (route order fixed to avoid `:id` capture)
- `GET /weekly-stats` — Aggregated completed counts (last 7 days)
- `DELETE /:id` — Delete task (author‑guarded)

Teams (`/teams`):
- `POST /create` — Create a team
- `POST /add` — Add member
- `POST /remove` — Remove member
- `GET /my` — Get current user’s teams
- Others as implemented in `teams.controller.ts`

Auth (`/auth`):
- `POST /login` — returns `{ access_token }`
- `POST /signup`
- `GET /profile` — protected; returns decoded user

---

### 🖥️ Frontend Highlights

- Dashboard: personal tasks, weekly stats, and teams
- My Tasks: manage your task lifecycle
- Team Tasks: view tasks by team; quick actions
- Create/Manage flows for tasks and teams
- Toasts on success/error (create/update/delete/status changes)

---

### 🧪 Quick Usage Walkthrough

1. Open frontend at http://localhost:5173
2. Sign up or log in
3. Create a task ✍️ or a team 👥
4. Add members ➕, set a task in progress 🚧, mark done ✅
5. View weekly stats 📈 on the dashboard

---

### 🛠️ Developer Notes

- Ensure the frontend always sends JWT in `Authorization` header; axios calls should place headers in the config, not in the body
- For team tasks, backend route order matters (`team/:team` must come before `:id`)
- `IN_PROGRESS` assigns the task to the acting user; `DONE` sets `completedAt`
- If you need multiple tasks per team, ensure service method uses `find` (array) instead of `findOne`

---

### 🧩 Useful Scripts

Backend:
```bash
npm run start        # start prod
npm run start:dev    # start with watch
npm run build        # compile to dist
```

Frontend:
```bash
npm run dev          # start Vite dev server
npm run build        # production build
npm run preview      # preview production build
```

---

### 🐞 Troubleshooting

- 401 Unauthorized creating tasks: ensure axios headers are in the config, and token is valid (15m expiry by default)
- Team tasks not visible: verify route order (team route before `:id`) and that documents contain `team`
- Stats empty: only `DONE` tasks with `completedAt` in last 7 days are counted

---

### 📜 License

MIT — feel free to use and modify. If this helps you, a ⭐ is always appreciated!

---

Made with ❤️, TypeScript, and too much coffee ☕


