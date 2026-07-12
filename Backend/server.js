import express from 'express'
import db from './utils/database.js'

const app = express();

app.get("/threadcode/chat", (req, res) =>{
  
  db.execute('SELECT * FROM contacts')
  .then(([rows]) => {
    console.log("querry executed");
    res.json(rows)  
  })
  .catch((error) =>{
    console.log(error);
  });

})





const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>{
  console.log(`Server statrted at address ${PORT}.`)
})