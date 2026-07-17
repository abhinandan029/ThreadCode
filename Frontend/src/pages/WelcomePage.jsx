import { BsFillLightningChargeFill, BsChatFill, BsLockFill} from "react-icons/bs";
import {useNavigate, Navigate} from 'react-router-dom'

import { useAuth } from '../context/authContext';

function Welcome(){
  const navigate = useNavigate();

  const {user, loading} = useAuth();

  if(loading) return null;
  if(user) return <Navigate to="/home" replace />;

  return(
    <div className="flex flex-col items-center w-full h-full pt-40 bg-linear-to-b from-secondary-bg to-amber-900 from-30% m-auto">
      
      <p className="text-[22px] text-amber-600 mb-0">Real-time collaborative coding</p>
      <h1 className="text-[50px] text-white font-medium" >Code together, from anywhere</h1>
      <p className="text-[16px] text-secondary-text" >Open a shared room, write code with your team in real time, </p>
      <p className="text-[16px] text-secondary-text">and chat right alongside it — no setup, no downloads.</p>
      
      <div className="m-10 flex flex-col justify-center items-center">
        
        <button 
        className=" bg-amber-600 m-2 px-6 text-[26px] rounded-md text-amber-950 hover:scale-[1.05] transition-all duration-300 ease-in-out cursor-pointer"
        onClick={() => navigate("/login")}
        >Login</button>
        
        <p className="text-secondary-text">OR</p>
        
        <button
        className="bg-amber-600 m-2 px-6 text-[26px] rounded-md text-amber-950 hover:scale-[1.05] transition-all duration-300 ease-in-out 
        cursor-pointer"
        onClick={() => navigate("/register")}
        >Register</button>
      
      </div>

      <div className="flex ">

        <div className="p-5 rounded-md mr-5 bg-white/10 basis-1/3 ">
          <BsFillLightningChargeFill className="mb-3 text-yellow-600 " />
          <h1 className="font-medium text-white text-[18px] mb-0">Live sync</h1>
          <p className="text-ternary-text text-[14px]">Every keystroke, instantly shared </p>
        </div>

        <div className="p-5 rounded-md mr-5 bg-white/10 basis-1/3">
          <BsChatFill className="mb-3 text-green-500 " />
          <h1 className="font-medium text-white text-[18px] mb-0">Room chat</h1>
          <p className="text-ternary-text text-[14px]">Talk while you build</p>
        </div>

        <div className="p-5 rounded-md bg-white/10 basis-1/3">
          <BsLockFill className="mb-3 text-red-950 " />
          <h1 className="font-medium text-white text-[18px] mb-0">Private rooms</h1>
          <p className="text-ternary-text text-[14px]">Only people you invite</p>
        </div>
      
      </div>
    
    </div>
  );
}

export default Welcome