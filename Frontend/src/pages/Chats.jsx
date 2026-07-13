import {useState, useEffect} from 'react'

function Chats(){
  const [data, setData] = useState([]);
  
  // useEffect(() => {
  //   fetch("/threadcode/chats")
  //   .then((res) => {
  //     return res.json();
  //   })
  //   .then((data) => {
  //     console.log(data);
  //     setData(data);
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //   })
  // }, []);

  return(
    <div className="flex flex-row w-full h-full">
      
      <div className="basis-1/3 bg-gray-700 flex flex-col items-center text-white">
        contacts
      </div>

      <div className="basis-2/3 bg-gray-500 flex flex-col items-center text-white">
        chat box
      </div>

    </div>
  );
}

export default Chats