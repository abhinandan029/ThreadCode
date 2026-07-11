import express from 'express'

const app = express();

app.get("/threadcode/hello", (req, res) =>{
  const word = "hello from backend";
  res.send(word)
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>{
  console.log(`Server statrted at address ${PORT}.`)
})