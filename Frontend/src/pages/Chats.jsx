import {useState, useEffect} from 'react'

function Chats(){
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetch("/threadcode/chats")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      setData(data);
    })
    .catch((error) => {
      console.log(error)
    })
  }, []);

  return(
    <div className="chat">
      <ul>
        {data.map((contact) => <li key={contact.contact_id}>{contact.contact_name}</li>)}
      </ul>
    </div>
  );
}

export default Chats