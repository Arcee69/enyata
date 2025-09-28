import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import Wookie from "../../assets/png/wookie.png"

const SpeciesDetails = () => {
    const [details, setDetails] = useState([])

    const { state } = useLocation()


    const getDetails = async () => {
        try {
            const res = await axios.get(`${state}`)
            console.log(res, "mushu")
            setDetails(res?.data || [])
        } catch (err) {
            console.log(err, "misk")
        }
    }

    useEffect(() => {
        getDetails()
    }, [state])


  return (
    <div className='w-full mt-[108px] flex items-start gap-[28px]'>
        <img src={Wookie} alt='Wookie' className='w-[318px] h-[450px]' />
        <div className='flex flex-col gap-7 mt-[48px]'>
            <p className='font-inter text-black font-bold text-[48px] leading-6'>{details?.name}</p>
            <div className='flex flex-col gap-[5px]'>
                <p className='font-inter font-medium text-base text-NEUTRAL-100'>Designation:{" "} <span span className='capitalize'>{details?.designation || "Not Available"}</span></p>
                <p className='font-inter font-medium text-base text-NEUTRAL-100'>Language:{" "} <span>{details?.language || "Not Available"}</span></p>
                <p className='font-inter font-medium text-base text-NEUTRAL-100'>Eye Colors:{" "} <span className='capitalize'>{details?.eye_colors || "Not Available"}</span></p>
                <p className='font-inter font-medium text-base text-NEUTRAL-100'>Average Lifespan:{" "} <span className='capitalize'>{details?.average_lifespan || "Not Available"}</span></p>
            </div>
        </div>
    </div>
  )
}

export default SpeciesDetails