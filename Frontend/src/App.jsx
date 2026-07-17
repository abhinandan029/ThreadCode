import Header from './components/Header'
import ProtectedRoute from "./components/ProtectedRoute"

import Welcome from './pages/WelcomePage'
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from './pages/Home'
import Room from './pages/Room'

import { AuthProvider } from './context/authContext'

import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <AuthProvider>
      <Header />
      <div className="flex flex-1 bg-white h-full">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />


          <Route path="/home" element={<ProtectedRoute ><Home /></ProtectedRoute>} />
          <Route path="/room/:roomId" element={<ProtectedRoute ><Room /></ProtectedRoute>} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App