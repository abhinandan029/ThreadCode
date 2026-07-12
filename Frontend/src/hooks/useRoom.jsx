import {nanoid} from 'nanoid'
import {useState} from 'react'

export function useRoom(){
  
  const [activeRoom, setActiveRoom] = useState({});

  function createRoom(){
    const room = {
      roomId : nanoid(12),
      roomName : "untitled" 
    }

    setActiveRoom(room);
    return room;
  }
 
  return { createRoom, activeRoom};
}