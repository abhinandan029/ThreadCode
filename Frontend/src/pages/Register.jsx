import {useNavigate} from 'react-router-dom'
import {useState} from 'react'

function Register(){
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  const [status, setStatus] = useState("idle");
  const [errMsg, setErrMsg] = useState("");

  async function handleSubmit(e){
    e.preventDefault();
    setErrMsg("");

    if (password !== cnfPassword){
      setStatus("error");
      setErrMsg("Password doesn't match!!");
      return;
    }

    setStatus("Submitting");

    try {
      const res = await fetch("/api/auth/register", {
        method : "POST",
        headers : { "Content-Type" : "application/json" },
        body : JSON.stringify({email, password})
      });

      const data = await res.json();

      if(!res.ok){
        throw new Error(data.error || `server responded with ${res.status}`);
      }

      setStatus("success");
      navigate("/login");

    }
    catch (error) {
      setStatus("error");
      setErrMsg(error.message);
    }
  }

  return(
    <div className="flex flex-col items-center justify-center w-full h-full bg-linear-to-b from-secondary-bg to-amber-900 from-30% m-auto">
    
    <form className="flex flex-col border border-white p-10 rounded-xl w-1/2" onSubmit={handleSubmit}>

      <h1 className="text-primary-text font-medium text-[30px]">Register</h1>
      <p className="text-secondary-text mb-7">Welcome to ThreadCode</p>
      
      <label htmlFor="email" className="text-[18px] text-white">Enter yor email </label>
      <input 
      id="email"
      type="text"
      className="mb-5 px-2 py-1 w-full rounded-md text-[20px] text-white outline-none bg-black/30 focus:bg-black/30"
      placeholder="name@email.com"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
      ></input>

      <label htmlFor="password" className="text-[18px] text-white">Enter your new password</label>
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

      <label htmlFor="cnf-password" className="text-[18px] text-white">Confirm your new password</label>
      <input 
      id="cnf-password"
      type="password"
      autoComplete="current-password"
      className="mb-5 px-2 w-full rounded-md py-1 text-[20px] text-white focus:outline-none bg-black/30"
      placeholder="*********"
      value={cnfPassword}
      onChange={(e) => setCnfPassword(e.target.value)}
      required
      ></input>

      {
        status === "error" && (
          <p className="text-red-400 text-sm mb-3">{errMsg}</p>
        )
      }

      <input 
      type="submit"
      value={status === "submitting" ? "Registering" : "Register"}
      disabled={status === "submitting"}
      className="text-[20px] bg-amber-600 rounded-md py-1 mt-7 hover:bg-amber-700 cursor-pointer"
      ></input>

    </form>

    </div>
  );
}

export default Register