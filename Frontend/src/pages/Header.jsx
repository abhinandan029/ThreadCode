import {useNavigate} from 'react-router-dom'
import { useState } from 'react';

import { generateRoom } from '../hooks/useRoom.jsx';

import { FaCode, FaBell, FaUserLarge, FaSlideshare } from "react-icons/fa6";

function Header(){

  const navigate = useNavigate();

  return (
    <div className="flex width-full items-center p-2 bg-gray-950 text-[30px]">
      
      <FaCode className="text-[30px] text-amber-400" /> 
      <h1 className="font-medium ml-2 text-white">ThreadCode</h1>

      <div className="text-[30px] ml-auto flex items-center justify-center">
        
        <button className="text-xl text-white cursor-pointer mr-5 hover:scale-[1.1] transition-all duration-300 ease-in-out"><FaBell /></button>

        <FaUserLarge className="mr-2 ml-3 text-red-200 cursor-pointer"/>

      </div>

    </div>
  );
}

export default Header