

import {useNavigate, useLocation, useParams} from 'react-router-dom'
import { MdHome, MdCommit, MdChat, MdSettings } from "react-icons/md";
import { FaSlideshare } from "react-icons/fa6";

function Sidebar(){
  const {roomId} = useParams();
  
  const navigate = useNavigate();


  return (
    <div className="flex flex-col text-[30px] pt-4  bg-gray-900 h-full px-3">
      
      <button className="buttons" onClick={() => navigate("/home")}><MdHome /></button>

      <button className="buttons" onClick={() => navigate(`./room/${roomId}`)}><FaSlideshare /></button>

      <button className="buttons" onClick={() => navigate("/chats")}><MdChat /></button>
      
      <button className="buttons" onClick={() => navigate("/projects")}><MdCommit /></button>
      
      <button className="buttons" onClick={() => navigate("/settings")}><MdSettings /></button>

    </div>
  );
}

export default Sidebar