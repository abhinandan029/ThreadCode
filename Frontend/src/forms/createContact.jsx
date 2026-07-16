import {useState} from 'react'

function CreateContact(){

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  function handleSubmit(){
    console.log(name);
    console.log(number);
  }

  return(
    <form className="border border-black text-black flex flex-col items-center justify-center m-auto p-10 rounded-md bg-gray-300" onSubmit={handleSubmit}>

      <label htmlFor="name" className="text-[14px] self-start">Enter the contact's name : </label>
      <input id="name" className="border border-black m-2 px-2 py-1 w-full mt-0 rounded-md bg-gray-400" type="text" placeholder="Name" name="name"
        onChange={()=> setName(name)}>
      </input>

      <label htmlFor="number" className="text-[14px] self-start">Enter the contact's number : </label>
      <input id="number" className="border border-black m-2 px-2 py-1 w-full mt-0 rounded-md bg-gray-400" type="text" placeholder="Number" name="number"
       onChange={() => setNumber(number)}>
      </input>

      <input className="m-2 border p-1 rounded-md bg-gray-500 cursor-pointer hover:bg-gray-600 " type="submit" value="Add Contact"></input>
    </form>
  );
}

export default CreateContact;