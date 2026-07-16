import Header from './components/Header'
import Home from './pages/Home'
import Room from './pages/Room'
import Chats from './pages/Chats'

import CreateContact from './forms/createContact.jsx'

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

          <Route path="/create-contact" element={<CreateContact />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App