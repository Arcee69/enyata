import React, { useState, useRef, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { LuBell } from 'react-icons/lu'

import Account from "../../assets/svg/account.svg"
import Kebab from "../../assets/svg/kebab.svg"
import { IoIosArrowBack } from 'react-icons/io'




const Header = () => {
  const [showLogout, setShowLogout] = useState(false)
  const logoutRef = useRef(null)

  const navigate = useNavigate()
  const location = useLocation()


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (logoutRef.current && !logoutRef.current.contains(event.target)) {
        setShowLogout(false);
      }
    };

    if (showLogout) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLogout]);

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className='py-[18px] px-[28px] w-full h-[64px]'>
      <div className='flex items-center gap-[55%]'>
        <div 
          onClick={() => navigate(-1)}
          className={`${location.pathname.includes("/details") ? "flex items-center gap-2 cursor-pointer" : "invisible"}`}
        >
          <IoIosArrowBack className='w-5 h-5 text-NEUTRAL-900' />
          <p className='font-inter leading-6 text-base text-NEUTRAL-900'>Back</p>
        </div>


        <div className='flex items-center gap-6'>
          <div className='flex items-center gap-8'>
            <LuBell className='w-5 h-5 text-NEUTRAL-600' />
            <div className='w-[1px] h-[25px] bg-NEUTRAL-800'></div>
            <div ref={logoutRef} className='relative flex items-center gap-[32px] cursor-pointer' onClick={() => setShowLogout(!showLogout)}>
              <img src={Account} alt='Account' className='w-[32px] h-[32px]' />
              <p className='text-NEUTRAL-700 text-karla text-[15px] leading-[100%]'>John Doe</p>
              <img src={Kebab} alt='Kebab' className='w-5 h-5' />
              {showLogout && (
                <div className='absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded shadow-lg p-2 z-10'>
                  <button onClick={handleLogout} type='button' className='text-red-500 cursor-pointer hover:text-red-700'>Logout</button>
                </div>
              )}
        </div>
          </div>
        </div>



      </div>
    </div>
  )
}

export default Header
