import '../styles/Sidebar.css'

import { MdHome, MdCommit, MdChat, MdSettings } from "react-icons/md";

function Sidebar(){
  return (
    <div className="sidebar">
      <button id="home"><MdHome /></button>
      <button id="projects"><MdCommit /></button>
      <button id="chat"><MdChat /></button>
      <button id="settings"><MdSettings /></button>
    </div>
  );
}

export default Sidebar