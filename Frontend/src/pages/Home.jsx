import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { generateRoom } from '../hooks/useRoom.jsx';

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
    <div className="bg-gray-700 flex flex-1 flex-col">
      <div className="flex justify-between basis-1/2">

        <div className="bg-gray-300 m-2 mr-0 rounded-sm p-2 flex justify-center items-center basis-2/3 ">
            chats
        </div>

        <div className="flex items-center justify-center bg-gray-300 border border-black flex-col basis-1/3 m-2 rounded-sm" >
          {room ? (
          <div className="flex justify-between items-center bg-white p-5 rounded-md">
            <div className="mr-2 border rounded-md p-2 text-[18px]">{room.roomId}</div>
            <button className="p-1 px-3 rounded-md text-[20px] bg-gray-800 text-white hover:scale-[1.05] hover:bg-gray-900 transition-all duration-300 ease-in-out" onClick={() => navigate(`/room/${room.roomId}`)}>Join</button>
          </div>
          ) : (
            <button className="px-2 py-1 rounded-md text-[20px] bg-gray-800 text-white hover:scale-[1.05] hover:bg-gray-900 transition-all duration-300 ease-in-out" onClick={handleCreate}>Create Room</button>
          )}
          
        </div>
      
      </div>
      
      <div className="basis-1/2 bg-gray-300 m-2 mt-0 rounded-md p-2 flex items-center justify-center" >
          call loggs
      </div>
      
    </div>
  );
}

export default Home;