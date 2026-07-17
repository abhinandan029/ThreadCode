import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { generateRoom } from '../hooks/useRoom.jsx';

import { FaRegCopy } from "react-icons/fa6";

function Home() {
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [copied, setCopied] = useState(false);

  function handleCreate() {
    setRoom(generateRoom());
    setCopied(false);
  }

  function copyCode() {
    navigator.clipboard.writeText(`http://localhost:5173/room/${room.roomId}`);
    setCopied(true);
  }

  return (
    <div className="bg-linear-to-b from-secondary-bg to-amber-900 from-30% flex flex-1 flex-col items-center justify-center">
      <h1 className="text-[50px] font-medium text-white" >Code Together, In Real Time</h1>
      <p className="text-secondary-text text-[20px] mb-5"> Create a room and share the link to start collaborating</p>

      <div className="flex justify-between">
        <button 
        className="m-5 bg-amber-700 px-2 py-1 text-[28px] rounded-md hover:scale-[1.05] transition-all duration-300 ease-in-out cursor-pointer"
        onClick={() => handleCreate()}>
          Create Room
        </button>

        <button 
        className="m-5 border border-amber-500 px-2 py-1 text-[28px] rounded-md text-amber-500 hover:scale-[1.05] transition-all duration-300 ease-in-out cursor-pointer"
        onClick={() => navigate(`/room/${room.roomId}`)}>
          Join Room
        </button>

      </div>

      {
        room ?
        <div className="flex flex-col items-center justify-center">
          <div 
          className="bg-black/20  border-black px-5 py-2  rounded-lg m-5 transition-all duration-300 ease-in-out flex items-center justify-between mb-0">
            <p className="text-white text-[22px]">Room ID : {room.roomId}</p>
            <FaRegCopy 
              title="copy code"
              className="ml-10 bg-ternary-bg p-1 rounded-sm flex items-center text-white scale-[2] hover:scale-[2.1] cursor-pointer transition-all duration-300 ease-in-out"
              onClick={() => copyCode()}
            />
          </div>
          {copied ? <p className="text-white transition-all duration-300 ease-in-out  ">copied</p> : ""}
        </div> :
        
        <div></div>
      }

      
      
    </div>
  );
}

export default Home;