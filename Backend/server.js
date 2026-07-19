import express from 'express'
import http from 'http'
import { Server } from '@hocuspocus/server'
import { WebSocketServer } from 'ws'

import db from './utils/database.js';

import {cookieParser} from "./utils/cookieParser.js"
import {findSession} from "./models/sessions.js"
import {findUserById} from "./models/users.js"
import {isMember} from "./models/room.js"

import authRouter from "./routes/auth.js"
import roomRouter from "./routes/rooms.js"

const app = express();
app.use(express.json());

app.use(authRouter);
app.use(roomRouter);

app.get('/api/health', (req, res) => res.send('ok'));

const hocuspocus = new Server({
  port: process.env.WS_PORT || 3000,

  onAuthenticate: async (data) => {
    const cookies = cookieParser(data.requestHeaders.get('cookie')); 
    const sessionId = cookies.sessionId;

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

const server = http.createServer(app);

const PORT = 4000;

server.listen(PORT, () => {
  console.log(`Server started at address ${PORT}`);
});

hocuspocus.listen()