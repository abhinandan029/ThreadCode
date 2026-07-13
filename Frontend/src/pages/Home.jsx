import {useNavigate} from 'react-router-dom'
import {useState} from 'react'

import '../styles/Home.css'

function Home( {createRoom, activeRoom} ){

  const navigate = useNavigate();

  const [copied, setCopied] = useState(false);

   function  copyCode(){
    navigator.clipboard.writeText(activeRoom.roomId);
    setCopied(true);
  }


  return(
    <div className="home-page">
      <button onClick={() => {
        createRoom();
        setCopied(false);
      }}>Create Room</button>
      
      {activeRoom.roomId ? 
        (<div id="room-id">{activeRoom.roomId} <button onClick={() => navigate(`/room/${activeRoom.roomId}`)}>Join</button></div>) : 
        <p>Generate room ID by clicking Create Room</p>
      }
    </div>
  );        
}

export default Home