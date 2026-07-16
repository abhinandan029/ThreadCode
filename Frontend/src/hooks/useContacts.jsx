import {useState} from 'react'

export function useContacts(){

  const [contacts, setcontacts] = useState([]);

  function createContact(){
    return(
      <form action="/api/" method="POST">
        <input type="text" placeholder="Name"></input>
        <input type="text" placeholder="Number"></input>
        <input type="submit"></input>
      </form>
    );
  }


  return { createContact } ;
}