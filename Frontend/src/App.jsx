import Header from './pages/Header'
import Home from './pages/Home'
import Room from './pages/Room'
import Chats from './pages/Chats'

import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Header />
      <div className="flex flex-1 bg-white; h-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/room/:roomId" element={<Room />} />
          <Route path="/chats" element={<Chats />} />
        </Routes>
      </div>
    </>
  );
}

export default App