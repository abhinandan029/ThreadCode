import { getAllContacts} from '../models/contacts.js'

export async function getContacts(req, res){
  try{
    const contacts = await getAllContacts();
    res.json(contacts);
  }
  catch (error){
    console.log(error);
    res.status(500).json({ error : 'Failed to fetch contacts'});
  }
}

export async function addContact(req, res){
  const {name, number} = req
}