import ThreadCode_DB from '../utils/database.js'

export async function getAllContacts(){
  const [contacts] = await ThreadCode_DB.query('SELECT * FROM contacts');
  return contacts;
}