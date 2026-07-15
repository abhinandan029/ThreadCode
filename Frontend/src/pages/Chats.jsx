import {useState, useEffect} from 'react'

function Chats(){
  const [chats , setChats] = useState([]);
  
  useEffect(() => {
    fetch("/api/chats")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      setChats(data);
    })
    .catch((error) => {
      console.log(error)
    })
  }, []);

  return(
    <div className="flex flex-row w-full h-full">
      
      <div className="basis-1/3 bg-gray-700 flex flex-col items-center text-white p-2">
        {
              chats.length > 0 ?
               chats.map((chat) => 
                <div key={chat.contact_id} className="border-b w-full justify-self-start text-[18px] hover:bg-gray-500 rounded-md cursor-pointer">
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