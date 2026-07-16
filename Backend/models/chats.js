import ThreadCode_DB from '../utils/database.js'

export async function getAllChats(){
  const [chats] = await ThreadCode_DB.query('SELECT * FROM contacts');
  return chats;
}