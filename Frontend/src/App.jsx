import Header from './pages/Header'
import Sidebar from './pages/Sidebar'
import Home from './pages/Home'

import {useEffect, useState} from 'react'
import axios from 'axios'

import './index.css'


function App() {
  const [header, setHeader] =  useState("Hello");

  useEffect(() => {
    axios.get("/threadcode/hello")
    .then((res) => {
      setHeader(res.data);
    })
    .catch((error) => {
      console.log(error)
    })
  });
  
  return(
    <>
      <Header /> 
      <div className="main-box">
        <Sidebar />
        <h1 id="head">{header}</h1>
        <Home />
      </div>
      
    </>
  );
}

export default App
