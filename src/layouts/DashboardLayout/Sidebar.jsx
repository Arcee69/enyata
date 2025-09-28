import React, { useState } from 'react'
import LogoSmall from "../../assets/svg/logo_small.svg"
import Dash from "../../assets/svg/dash.svg"
import { useLocation, useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("overview")

  const handleTabChange = (value) => {
    setActiveTab(value)
  }

  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className='bg-NEUTRAL-500 h-full flex flex-col items-center pt-[32px] pl-6 pr-4 gap-[30px]'>
      <img src={LogoSmall} alt='LogoSmall' className='' />
      <div className='flex flex-col items-start justify-center w-[14.5rem] gap-[70px]'>
        <div
          onClick={() => {handleTabChange("overview"); navigate("/overview")}}
          className={`${activeTab === "overview" && location.pathname.includes("/overview") ? "bg-BLUE-100" : "hover:bg-BLUE-100"} cursor-pointer  rounded-[4px] gap-4 w-full  flex py-3 px-6 h-[48px]`}
        >
          <img src={Dash} alt='Dash' className='' />
          <p className={`font-inter font-semibold leading-6 text-white text-base`}>Overview</p>
        </div>
        <div className='flex flex-col w-full gap-5'>
          <div
            onClick={() => {handleTabChange("starships"); navigate("/starships")}}
            className={`${activeTab === "starships" && location.pathname.includes("/starships")  ? "bg-BLUE-100" : " hover:bg-BLUE-100"} cursor-pointer rounded-[4px] gap-4 w-full flex items-center py-3 px-6 h-[48px]`}
          >
            <div className='w-[17px] h-[16px] rounded-[5px] bg-PURPLE-100'></div>
            <p className={`font-inter font-semibold leading-6 text-white text-base`}>Starships</p>
          </div>
          <div
            onClick={() => {handleTabChange("people"); navigate("/people")}}
            className={`${activeTab === "people" && location.pathname.includes("/people")  ? "bg-BLUE-100" : " hover:bg-BLUE-100"} cursor-pointer rounded-[4px] gap-4 w-full flex items-center py-3 px-6 h-[48px]`}
          >
            <div className='w-[17px] h-[16px] rounded-[5px] bg-PINK-100'></div>
            <p className={`font-inter font-semibold leading-6 text-white text-base`}>People</p>
          </div>
          <div
            onClick={() => {handleTabChange("species"); navigate("/species")}}
            className={`${activeTab === "species" && location.pathname.includes("/species") ? "bg-BLUE-100" : "hover:bg-BLUE-100"} cursor-pointer rounded-[4px] gap-4 w-full flex items-center py-3 px-6 h-[48px]`}
          >
            <div className='w-[17px] h-[16px] rounded-[5px] bg-YELLOW-100'></div>
            <p className={`font-inter font-semibold leading-6 text-white text-base`}>Species</p>
          </div>


        </div>
      </div>
    </div>
  )
}

export default Sidebar