import {useState, useEffect} from 'react'
import {useContacts} from '../hooks/useContacts.jsx'

import {useNavigate} from 'react-router-dom'

function Chats(){
  const navigate = useNavigate();
  
  const {createContact} = useContacts();

  const [chats , setChats] = useState([]);
  
  useEffect(() => {
    fetch("/api/chats")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      setChats(data);
    })
    .catch((error) => {
      console.log(error)
    })
  }, []);

  return(
    <div className="flex flex-row w-full h-full">
      
      <div className="basis-1/3 bg-gray-700 flex flex-col text-white p-2">
        
        <div className="flex items-center justify-between p-1 mb-2" >
          <p className="text-[20px]">Contacts</p>
          <button className="px-2 py-1 rounded-md text-[16px] bg-gray-800 text-white hover:scale-[1.05] cursor-pointer hover:bg-gray-900 transition-all duration-300 ease-in-out " onClick={() => navigate('/create-contact')}>Add Contacts</button>
        </div>
        
        {
          chats.length > 0 ?
          chats.map((chat) => 
          <div key={chat.contact_id} className="border w-full justify-self-start text-[18px] mb-1 hover:bg-gray-500 rounded-md cursor-pointer">
            <p className="ml-5 text-[24px]">{chat.contact_name}</p>
          </div>):
              
          <div className="self-center flex flex-col justify-center  items-center w-full h-full">
            <p className="text-[20px] text-red-900">There are no contacts !!!</p>
            <button className="px-2 py-1 rounded-md text-[16px] mt-2 bg-gray-800 text-white hover:scale-[1.05] cursor-pointer hover:bg-gray-900 transition-all duration-300 ease-in-out ">Add Contacts</button>
          </div>
               
        }
      </div>

      <div className="basis-2/3 bg-gray-500 flex flex-col items-center text-white">
        chat box
      </div>

    </div>
  );
}

export default Chats