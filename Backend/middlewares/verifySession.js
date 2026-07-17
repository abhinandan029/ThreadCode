import {cookieParser} from '../utils/cookieParser.js'
import {findSession} from '../models/sessions.js'
import {findUserById} from '../models/users.js'

export async function verifySession(req, res, next){
  const cookies = cookieParser(req.headers.cookie);
  const sessionId = cookies.sessionId;

  if(!sessionId){
    return res.status(401).json({ error : "Not Logged In"});
  }

  const session = await findSession(sessionId);
  if(!session){
    return res.status(401).json({error : "Session Expired"});
  }

  const user = await findUserById(session.user_id);
  req.user = user ;
  
  next();
}