import { getAllChats} from '../models/chats.js'

export async function getChats(req, res){
  try{
    const chats = await getAllChats();
    res.json(chats);
  }
  catch (error){
    console.log(error);
    res.status(500).json({ error : 'Failed to fetch chats'});
  }
}