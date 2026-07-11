import '../styles/Header.css'

import { FaCode, FaBell, FaUserLarge } from "react-icons/fa6";

function Header(){
  return (
    <div className="header">
      <FaCode id="logo" /> 
      <h1>ThreadCode</h1>
      <div id="profile-box">
        <button><FaBell /></button>
        <FaUserLarge id="user-profile"/>
      </div>
    </div>
  );
}

export default Header