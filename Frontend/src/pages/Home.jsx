import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { generateRoom } from '../hooks/useRoom.jsx';
import '../styles/Home.css';

function Home() {
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [copied, setCopied] = useState(false);

  function handleCreate() {
    setRoom(generateRoom());
    setCopied(false);
  }

  function copyCode() {
    navigator.clipboard.writeText(room.roomId);
    setCopied(true);
  }

  return (
    <div className="home-page">
      <button onClick={handleCreate}>Create Room</button>

      {room ? (
        <div id="room-id">
          {room.roomId}
          <button onClick={copyCode}>{copied ? 'Copied!' : 'Copy'}</button>
          <button onClick={() => navigate(`/room/${room.roomId}`)}>Join</button>
        </div>
      ) : (
        <p>Generate room ID by clicking Create Room</p>
      )}
    </div>
  );
}

export default Home;