import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";

function Navbar() {
  const [currentName, setCurrentName] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    var currentName_ = localStorage.getItem("currentName");
    if (currentName_) setCurrentName(currentName_);
  }, []);

  const handleLogout = ()=>{
    localStorage.setItem("currentName", "");
    setCurrentName(false)
    navigate('/');
  }

  return (
    <div className="flex flex-row ">
      <div className="basis-1/4">
        <img to="/" src={Logo} className="w-80" alt="U-tad League" />
      </div>
      <div className="basis-1/2 flex justify-center items-center  font-montserrat text-white">
        <nav className="  w-full">
          <ul className="flex justify-center text-2xl space-x-12">
            <li className="transition-all duration-200 hover:-translate-x-2">
              <Link to="/">Home</Link>
            </li>
            <li className="transition-all duration-200 hover:px-2">
              <Link to="/ranking">Ranking</Link>
            </li>
            <li className="transition-all duration-200 hover:translate-x-2">
              <Link to="/team">Team</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="basis-1/4 -translate-x-16 flex justify-center items-center  font-montserrat text-white">
        <nav className=" w-full">
          <ul className="flex justify-center text-2xl space-x-12">
            <li className="transition-all duration-200 hover:-translate-x-2">
              <Link to="/register">Register</Link>
            </li>
            <li className="transition-all duration-200 hover:px-2">
              <Link to="/login">{currentName ? currentName : "Login"}</Link>
            </li>
            <li className="transition-all duration-200 hover:px-2">
              <Link onClick={handleLogout}>{currentName ? "Logout" : ""}</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
