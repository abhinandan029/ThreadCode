import express from 'express';
import { Server } from '@hocuspocus/server';
import db from './utils/database.js';

const app = express();

// --- your existing REST route stays as-is ---
app.get("/api/home/contacts", (req, res) => {
  db.execute('SELECT * FROM contacts')
    .then(([rows]) => {
      console.log("query executed");
      res.json(rows);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/api/chats", (req, res) => {
  db.execute('SELECT * FROM contacts')
    .then(([rows]) => {
      console.log("query executed");
      res.json(rows);
    })
    .catch((error) => {
      console.log(error);
    });
});

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