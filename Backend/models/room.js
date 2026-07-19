import DB from "../utils/database.js"

export async function createRoom(roomId, ownerId, name="untitled"){
  await DB.query('INSERT INTO rooms (id, name, owner_id) VALUES (?, ?, ?)', [roomId, name, ownerId]);

  await DB.query('INSERT INTO room_members (room_id, user_id, invited_by) VALUES (?, ?, ?)', [roomId, ownerId, ownerId]);
}

export async function findRoomById(roomId){
  const [rows] = await DB.query('SELECT * FROM rooms WHERE id = ?', [roomId]);
  return rows[0];
}

export async function isMember(roomId, userId){
  const [rows] = await DB.query('SELECT * FROM room_members WHERE room_id = ? AND user_id = ?', [roomId, userId]);
  return rows.length > 0;
}

export async function addMember(roomId, userId, invitedBy){
  await DB.query('INSERT INTO room_members (room_id, user_id, invited_by) VALUES (?, ?, ?)', [roomId, userId, invitedBy]);

}

export async function listMembers(roomId){
  const [rows] = await DB.query('SELECT u.id, u.email FROM room_members rm JOIN users u ON rm.user_id = u.id WHERE rm.room_id = ?', [roomId]);

  return rows;
}

export async function removeMember(roomId, userId){
  await DB.query('DELETE FROM room_members WHERE room_id = ? AND user_id = ?', [roomId, userId]);
}

export async function transferOwnership(roomId, newOwnerId){
  await DB.query('UPDATE rooms SET owner_id = ? WHERE id = ?', [newOwnerId, roomId]);
}

export async function findNextOwnerCandidate(roomId, excludeUserId){
  const [rows] = await DB.query(
    'SELECT user_id FROM room_members WHERE room_id = ? AND user_id != ? ORDER BY joined_at ASC LIMIT 1',
    [roomId, excludeUserId]
  );
  return rows[0];
}