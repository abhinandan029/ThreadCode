import Header from './pages/Header'
import Sidebar from './pages/Sidebar'
import Home from './pages/Home'

import './index.css'


function App() {
  
  return(
    <>
      <Header /> 
      <div className="main-box">
        <Sidebar />
        <Home />
      </div>
      
    </>
  );
}

export default App
