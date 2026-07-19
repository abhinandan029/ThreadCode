# ThreadCode

A real-time collaborative code editor built for pairing and small-group coding sessions — think a lightweight, self-hosted alternative to Replit's multiplayer mode. Create a room, invite people by email, and edit JavaScript together with live cursors, in-browser code execution, and a built-in chat, all synced instantly across every connected client.

**Live demo:** [thread-code.vercel.app](https://thread-code.vercel.app)

## Features

- **Real-time collaborative editing** — powered by CRDTs (Yjs), so multiple people can type in the same file simultaneously with automatic, conflict-free merging — no "last write wins" data loss.
- **Invite-only rooms** — rooms are private by default. Only the owner can invite new members by email, and access is enforced both on the REST API and the live WebSocket connection itself.
- **Presence indicators** — see who's currently online in a room at a glance, with live "joined/left" notices in the chat.
- **Room chat** — a persistent, room-scoped chat panel that rides on the same real-time connection as the editor.
- **In-browser JavaScript execution** — run code directly in the browser and see `console.log` output and errors instantly, no server-side sandboxing required.
- **Session-based authentication** — built from scratch using `bcrypt` for password hashing and hand-rolled server-side sessions with `httpOnly` cookies, rather than relying on third-party auth libraries.
- **Live-updating navigation** — the header reflects auth state, active room, and pending invites in real time.

## Tech Stack

**Frontend**
- React (Vite)
- Tailwind CSS
- React Router
- CodeMirror 6 (`@uiw/react-codemirror`)
- Yjs + `y-codemirror.next` for CRDT-based sync

**Backend**
- Node.js + Express (MVC structure: models / controllers / routes / middleware)
- Hocuspocus (WebSocket server for Yjs document sync)
- MySQL (raw SQL via `mysql2`, no ORM)
- `bcrypt` for password hashing
- Custom-built session management (no JWT, no third-party session middleware)

**Infrastructure**
- Frontend deployed on **Vercel**
- Backend split into two independent **Railway** services — one for the REST API, one for the WebSocket/Hocuspocus server
- MySQL hosted as a **Railway** database service

## Architecture Notes

- The editor's real-time sync and the chat both live on the same Yjs document per room — the code editor uses a shared `Y.Text`, and chat uses an append-only `Y.Array`, so no separate chat server or protocol was needed.
- Because the REST API and WebSocket server run as two separate Railway services (on two separate domains), authentication for the WebSocket connection is passed explicitly as a token rather than relying on cookies, which don't cross service domains by default.
- Room access control is enforced twice: once via a REST endpoint the frontend checks before attempting to join, and again inside Hocuspocus's own `onAuthenticate` hook — so access can't be bypassed even by connecting directly to the WebSocket.

## Getting Started

### Prerequisites
- Node.js 18+
- A MySQL database (local or hosted)

### Backend setup
```bash
cd Backend
npm install
```

Create a `.env` file:
```
DATABASE_URL=mysql://user:password@localhost:3306/threadcode
```

Run the SQL migration files in `Backend/migrations` against your database, in order.

```bash
npm run dev
```

### Frontend setup
```bash
cd Frontend
npm install
```

Create a `.env` file:
```
VITE_WS_URL=ws://localhost:3000
```

```bash
npm run dev
```

## License

MIT
