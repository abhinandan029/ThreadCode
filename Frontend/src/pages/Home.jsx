import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { generateRoom } from '../hooks/useRoom.jsx';

function Home() {
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [copied, setCopied] = useState(false);


  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    fetch("/api/home/contacts")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      setContacts(data);
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])

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

        <div className="bg-gray-300 m-2 mr-0 rounded-sm p-2 flex flex-col basis-2/3 ">
            {
              contacts.length > 0 ?
               contacts.map((contact) => 
                <div key={contact.contact_id} className="border-b w-full justify-self-start text-[18px] hover:bg-gray-500 rounded-md cursor-pointer">
                  <p className="ml-5 text-[24px]">{contact.contact_name}</p>
                </div>):
              
              <div className="self-center flex flex-col justify-center  items-center w-full h-full">
                <p className="text-[20px] text-red-900">There are no contacts !!!</p>
                <button className="px-2 py-1 rounded-md text-[16px] mt-2 bg-gray-800 text-white hover:scale-[1.05] cursor-pointer hover:bg-gray-900 transition-all duration-300 ease-in-out ">Add Contacts</button>
              </div>
               
            }
        </div>

        <div className="flex items-center justify-center bg-gray-300 border border-black flex-col basis-1/3 m-2 rounded-sm" >
          {room ? (
          <div className="flex justify-between items-center bg-white p-5 rounded-md">
            <div className="mr-2 border rounded-md p-2 text-[18px]">{room.roomId}</div>
            <button className="p-1 px-3 rounded-md text-[20px] bg-gray-800 text-white hover:scale-[1.05] cursor-pointer hover:bg-gray-900 transition-all duration-300 ease-in-out" onClick={() => navigate(`/room/${room.roomId}`)}>Join</button>
          </div>
          ) : (
            <button className="px-2 py-1 rounded-md text-[20px] bg-gray-800 text-white hover:scale-[1.05] cursor-pointer hover:bg-gray-900 transition-all duration-300 ease-in-out" onClick={handleCreate}>Create Room</button>
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