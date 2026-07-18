import { createRoom, findRoomById, isMember, addMember, listMembers } from "../models/room.js"
import {findUserByEmail} from "../models/users.js"

export async function createRoomHandler(req, res){
  const {roomId, name} = req.body;
  if(!roomId){
    return res.status(400).json({error : "Room ID is required"});

    try {
      await createRoom(roomId, req.user.id, name);
      res.status(201).json({message : "Room Created"});
    }
    catch(error){
      console.error(error);
      res.status(500).json({error : "Failed to create Room!"});
    }
  } 
}

export async function inviteToRoom(req, res){
  const { roomId } = req.params;
  const { email } = req.body;

  try {
    const room = await findRoomById(roomId);
    if(!room) return res.status(400).json({error : "Room Not Found"});
    if(room.owner_id !== req.user.id){
      return res.status(403).json({error : "Only the Room owner can invite the people."});
    }

    const invitedUser = await findUserByEmail(email)
    if(!invitedUser) return res.status(404).json({error : "No account with that email."});

    const alreadyMember = await isMember(roomId, invitedUser.id);
    if(alreadyMember) return res.status(409).json({error : "User is already a member."});

    await addMember(roomId, invitedUser.id, req.user.id);
    res.status(201).json({ message : "User Invited"});
    
  }
  catch(error){
    console.error(error);
    res.status(500).json({error : "Failed to invite user"});
  }
}

export async function getRoomMembers(req, res){
  const { roomId } = req.params;
  
  try{
    const members = await listMembers(roomId);
    res.json({members});
  }
  catch(error){
    console.error(error);
    res.status(500).json({error : "Failed to fetch Members"});
  }
}

export async function checkRoomAccess(req, res){
  const {roomId} = req.params;

  try {
    const room = await findRoomById(roomId);
    if(!room) return res.status(404).json({error : "Room Not Found"});

    const allowed = await isMember(roomId, req.user.id);
    if(!allowed) return res.status(403).json({error : "You are not Invited to this room."});

    res.json({ ok : true, roomName : room.name});
  }
  catch(error){
    console.error(error);
    res.status(500).json({error : "Failed to check room access."});
  }
}