import {useNavigate, useParams, useLocation} from 'react-router-dom'
import { useState } from 'react';

import { generateRoom } from '../hooks/useRoom.jsx';
import {useAuth} from "../context/authContext"

import { FaCode, FaBell} from "react-icons/fa6";

function Header(){

  const {user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {roomId} = useParams();

  return (
    <div className="flex width-full items-center justify-between px-1 bg-primary-bg text-[30px]">
      
      <div className="flex width-full items-center justify-center p-2 text-[30px]">
        <FaCode className="text-[30px] text-amber-500" /> 
        <h1 className="font-medium ml-2 text-white">ThreadCode</h1>
    
        {
          !loading && user && (
          <div className ="flex justify-between ml-10 mt-1">
            <button 
            className={location.pathname === "/home" ? "active-page" : "inactive-page"}
            onClick={() => navigate("/home")}>
              Home
            </button>

            <button 
              className={location.pathname === "/room" ? "active-page" : "inactive-page"}
              onClick={() => navigate(roomId ? `./room/${roomId}` : "/room")}>
               Room
            </button>
          </div>
        )}
        
      </div>

      <div className="text-[30px] flex items-center justify-center">

        {
          !loading && user && (
          <>
            <button className="text-xl text-secondary-text cursor-pointer mr-5 hover:scale-[1.1] hover:text-white transition-all duration-300 ease-in-out"><FaBell /></button>

            <button 
            className="text-secondary-text text-[18px] bg-amber-800 hover:scale-[1.05] px-2 py-1 mr-2 rounded-sm cursor-pointer transition-all duration-300 ease-in-out"
            onClick={async () => {
                const confirm = window.confirm("Do you want to Logout ?");
                if(confirm){await logout();}else{return} 
                navigate("/")
              }}>
              Logout
            </button>
          </>
        )}

      </div>

    </div>
  );
}

export default Header