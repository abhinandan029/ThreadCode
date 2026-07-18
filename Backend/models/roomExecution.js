import DB from "../utils/database.js"

export async function saveExecution(roomId, executedBy, language, code, output){

  await DB.query('INSERT INTO room_executions (room_id, executed_by, language, code, output) VALUES (?, ?, ?, ?, ?)', [roomId, executedBy, language, code, output]);
}

export async function listExecutions(roomId){
  const [rows] = await BD.query('SELECT * FROM room_executions WHERE room_id = ? ORDER BY executed_at DESC', [roomId]);

  return rows;
}