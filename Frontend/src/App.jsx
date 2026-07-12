import Header from './pages/Header'
import Sidebar from './pages/Sidebar'
import Home from './pages/Home'
import Chats from './pages/Chats.jsx'

import { Routes, Route} from 'react-router-dom'
import {useEffect, useState} from 'react'


import './index.css'


function App() {

  // useEffect(() => {
  //   axios.get("/threadcode/hello")
  //   .then((res) => {
  //     setHeader(res.data);
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //   })
  // });
  
  return(
    <>
      <Header /> 
      <div className="main-box">
        <Sidebar />
        <Routes>

          <Route path="/home" element={<Home />}></Route>
          <Route path="/chats" element={<Chats />}></Route>
          {/* <Route path="/projects" element={<Projects />}></Route>
          <Route path="/settings" element={<settings />}></Route> */}

        </Routes>
      </div>
      
    </>
  );
}

export default App
