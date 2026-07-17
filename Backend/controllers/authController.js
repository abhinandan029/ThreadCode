import bcrypt from 'bcrypt';
import {findUserByEmail, createUser, findUserById} from "../models/users.js"
import {createSession, deleteSession} from "../models/sessions.js"
import {cookieParser} from "../utils/cookieParser.js"

export async function register(req, res){
  const {email, password} = req.body;

  if(!email || !password){
    return res.status(400).json({error : "email and password are required"});
  }

  try{
    const existing = await findUserByEmail(email)
    if(existing){
      return res.status(409).json({error : "An Account with this email already Exists."});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser(email, hashedPassword);

    res.status(201).json({message : "account created."});

  }
  catch(error){
    console.error(error);
    res.status(500).json({ error : "Registration Failed"})
  }
}

export async function login(req, res){
  const {email, password} = req.body;

  if(!email || !password){
    return res.status(400).json({error : "Email and password are required."});
  }

  try{
    const user = await findUserByEmail(email)
    if(!user) {
      return res.status(401).json({error : "invalid email or password."});
    }

    const passwordCheck = await bcrypt.compare(password, user.password_hash);
    if(!passwordCheck){
      return res.status(401).json({error : "Invalid Email or password."});
    }

    const {sessionId, expiresAt} = await createSession(user.id);

    res.cookie('sessionId', sessionId, {
      httpOnly : true,
      secure : process.env.NODE_ENV === 'production',
      sameSite : "lax",
      expires : expiresAt,
    });

    res.json({user : {id: user.id, email : user.email}});
  }
  catch(error){
    console.error(error);
    res.status(500).json({error : "Login Failed"});
  }
}

export async function logout(req, res){
  const cookies = cookieParser(req.headers.cookie);

  if(cookies.sessionId) await deleteSession(cookies.sessionId);

  res.clearCookie('sessionId');
  res.json({ message : "Logged out"});
}

export async function me(req, res){
  res.json({ user : req.user});
}