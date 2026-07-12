import Header from './pages/Header'
import Sidebar from './pages/Sidebar'
import Home from './pages/Home'
import Room from './pages/Room'
import Chats from './pages/Chats'

import {useRoom} from './hooks/useRoom.jsx'

import { Routes, Route} from 'react-router-dom'
import {useEffect, useState} from 'react'


import './index.css'


function App() {

  const { createRoom, activeRoom} = useRoom();


  
  return(
    <>
      <Header /> 
      <div className="main-box">
        <Sidebar />
        <Routes>

          <Route path="/" element={<Home createRoom={createRoom} activeRoom={activeRoom}/>}></Route>       /*Default Page*/
          <Route path="/home" element={<Home createRoom={createRoom} activeRoom={activeRoom}/>}></Route>
          <Route path="/room" element={<Room activeRoom={activeRoom}/>}></Route>
          {/* <Route path="/chats" element={<Chats />}></Route> */}
          {/* <Route path="/projects" element={<Projects />}></Route>
          <Route path="/settings" element={<settings />}></Route> */}

        </Routes>
      </div>
      
    </>
  );
}

export default App
