import express from 'express';
import { Server } from '@hocuspocus/server';
import db from './utils/database.js';

import authRouter from "./routes/auth.js"

const app = express();
app.use(express.json());

app.use(authRouter);

const PORT = 3000 ; 
app.listen(PORT, () => {
  console.log(`REST API listening at port  : ${PORT}`)
})

const hocuspocus = new Server({
  port : 4000,
  onConnect: async (data) => {
    console.log(`Client connected to room: ${data.documentName}`);
  },
});

hocuspocus.listen();