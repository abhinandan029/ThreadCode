import express from 'express';
import { Server } from '@hocuspocus/server';
import db from './utils/database.js';

const app = express();

// --- your existing REST route stays as-is ---
// app.get("/threadcode/chat", (req, res) => {
//   db.execute('SELECT * FROM contacts')
//     .then(([rows]) => {
//       console.log("query executed");
//       res.json(rows);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });

const hocuspocus = new Server({
  port: process.env.PORT || 3000,
  onConnect: async (data) => {
    console.log(`Client connected to room: ${data.documentName}`);
  },
});

hocuspocus.listen();