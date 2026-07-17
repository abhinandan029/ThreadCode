import {useNavigate} from 'react-router-dom'
import{useState} from 'react'

import { useAuth } from '../context/authContext';

function Login(){

  const {setUser} = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle");
  const [errMsg, setErrMsg] = useState("");

  async function handleSubmit(e){
    e.preventDefault();
    setErrMsg("");
    setStatus("submitting");

    try{
      const res = await fetch("/api/auth/login", {
        method : "POST",
        headers : {"Content-Type" : "application/json" },
        credentials: "include",
        body : JSON.stringify({email, password})
      });

      const data = await res.json();

      if(!res.ok) {
        throw new Error(data.error || `Server responded with ${res.status}`);
      }
      setUser(data.user)
      setStatus("success");
      navigate("/home");

    }
    catch(error){
      setStatus("error");
      setErrMsg(error.message);
    }
  }

  return(
    <div className="flex flex-col items-center justify-center w-full h-full bg-linear-to-b from-secondary-bg to-amber-900 from-30% m-auto">
    
      <form className="flex flex-col border border-white p-10 rounded-xl w-1/2" onSubmit={handleSubmit}>

        <h1 className="text-primary-text font-medium text-[30px]">Log In</h1>
        <p className="text-secondary-text mb-7">Welcome back to ThreadCode</p>
        
        <label htmlFor="email" className="text-[18px] text-white">Enter yor email </label>
        <input 
        id="email"
        type="text"
        autoComplete="new-email"
        className="mb-5 px-2 py-1 w-full rounded-md text-[20px] text-white outline-none bg-black/30 focus:bg-black/30"
        placeholder="name@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        ></input>

        <label htmlFor="password" className="text-[18px] text-white">Enter your password</label>
        <input 
        id="password"
        type="password"
        autoComplete="new-password"
        className="mb-5 px-2 w-full rounded-md py-1 text-[20px] text-white focus:outline-none bg-black/30"
        placeholder="*********"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        ></input>

        {status === "error" && (
          <p className="text-red-400 text-sm mb-3" >{errMsg}</p>
        )}

        <input 
        type="submit"
        value={status === "submitting" ? "Logging In" : "Login"}
        disabled = {status === "submitting"}
        className="text-[20px] bg-amber-600 rounded-md py-1 mt-7 hover:bg-amber-700 cursor-pointer"
        ></input>

        <p className="self-center text-secondary-text">
          Dont have an account? 
          <a href="/register" className="ml-2 text-amber-400" >Register</a>
        </p>

      </form>

    </div>
  );
}

export default Login