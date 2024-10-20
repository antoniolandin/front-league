import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png'

function Navbar() {
  return (
    <div className="flex flex-row ">
      <div className='basis-1/4'>
        <img src={Logo} className="w-80" alt="U-tad League" />
      </div>
        <div className='basis-1/2 flex justify-center items-center  font-montserrat text-white'>
          {/* Menú de navegación */}
          <nav className='  w-full'>
            <ul className='flex justify-center text-2xl space-x-12'>
              <li className='transition-all duration-200 hover:-translate-x-2'>
                <Link to="/">Home</Link>
              </li>
              <li className='transition-all duration-200 hover:px-2'>
                <Link to="/ranking">Ranking</Link>
              </li>
              <li className='transition-all duration-200 hover:translate-x-2'>
                <Link to="/team">Team</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="basis-1/4"></div>
    </div>
  );
}

export default Navbar;