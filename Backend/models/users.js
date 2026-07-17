import DB from "../utils/database.js"

export async function findUserByEmail(email){
  const [rows] = await DB.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
}

export async function findUserById(id){
  const [rows] = await DB.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
}

export async function createUser(email, hashedPassword){
  const [result] = await DB.query('INSERT INTO users(email, password_hash) VALUES(?, ?)', [email, hashedPassword]);
  return result;
}