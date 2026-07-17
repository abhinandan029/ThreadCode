import crypto from 'crypto'
import DB from '../utils/database.js'

const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000 ;

export async function createSession(userId){

  const sessionId = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  await DB.query("INSERT INTO sessions(id, user_id, expires_at) VALUES(?, ?, ?)", [sessionId, userId, expiresAt]);

  return { sessionId, expiresAt };
}

export async function findSession(sessionId){
  const [rows] = await DB.query('SELECT * FROM sessions WHERE id = ? AND expires_at > NOW()', [sessionId]);
  return rows[0];
}

export async function deleteSession(sessionId){
  await DB.query('DELETE FROM sessions WHERE id = ?', [sessionId]);
  
}