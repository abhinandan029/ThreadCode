import express from 'express';
import { Server } from '@hocuspocus/server';
import cors from 'cors';

import db from './utils/database.js';

import { cookieParser } from "./utils/cookieParser.js"
import { findSession } from "./models/sessions.js"
import { findUserById } from "./models/users.js"
import { isMember } from "./models/room.js"

import authRouter from "./routes/auth.js"
import roomRouter from "./routes/rooms.js"

const MODE = process.env.SERVICE_MODE; // "rest" or "ws"

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

app.use(express.json());

app.use(authRouter);
app.use(roomRouter);

app.get('/api/health', (req, res) => res.send('ok'));

if (MODE !== 'ws') {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`REST server started at address ${PORT}`);
  });
}

const hocuspocus = new Server({
  port: process.env.PORT || 3000,

  onAuthenticate: async (data) => {
    const sessionId = data.token;

    if (!sessionId) throw new Error('Not authenticated');

    const session = await findSession(sessionId);
    if (!session) throw new Error('Session expired');

    const user = await findUserById(session.user_id);
    if (!user) throw new Error('User Not Found');

    const allowed = await isMember(data.documentName, user.id);
    if (!allowed) throw new Error('Not a member of this room.');

    return { user };
  },

  onConnect: async (data) => {
    console.log(`Client connected to room ${data.documentName}`);
  },
});

if (MODE !== 'rest') {
  hocuspocus.listen();
}