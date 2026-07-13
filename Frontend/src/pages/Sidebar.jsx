import '../styles/Sidebar.css'

import {useNavigate, useLocation, useParams} from 'react-router-dom'
import { MdHome, MdCommit, MdChat, MdSettings } from "react-icons/md";
import { FaSlideshare } from "react-icons/fa6";

function Sidebar({activeRoom}){
  
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? "active-path" : "";

  return (
    <div className="sidebar">
      <button id={isActive(location.pathname === "/home" ? "/home" : "/")}  onClick={() => navigate("/home")}><MdHome /></button>
      <button id={isActive(`/room/${activeRoom.roomId}`)} onClick={() => navigate(`/room/${activeRoom.roomId}`)}><FaSlideshare /></button>
      <button id={isActive('/projects')} onClick={() => navigate("/projects")}><MdCommit /></button>
      <button id={isActive('/chats')} onClick={() => navigate("/chats")}><MdChat /></button>
      <button id={isActive('/settings')} onClick={() => navigate("/settings")}><MdSettings /></button>
    </div>
  );
}

export default Sidebar