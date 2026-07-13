import Header from './pages/Header'
import Sidebar from './pages/Sidebar'
import Home from './pages/Home'
import Room from './pages/Room'

import { Routes, Route } from 'react-router-dom'
import './index.css'

function App() {
  return (
    <>
      <Header />
      <div className="main-box">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/room/:roomId" element={<Room />} />
        </Routes>
      </div>
    </>
  );
}

export default App