import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className='flex w-full h-screen'>
        <div className='w-[480px] h-full bg-PRIMARY flex flex-col items-center justify-center'>
            <Sidebar />
        </div>
        <div className='flex bg-white w-full flex-col h-full items-center justify-center'>
            <Outlet />
        </div>

    </div>
  )
}

export default AuthLayout