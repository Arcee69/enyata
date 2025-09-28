import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import Woman from "../../assets/png/woman.png"

const PeopleDetails = () => {
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
            <img src={Woman} alt='Woman' className='w-[318px] h-[450px]' />
            <div className='flex flex-col gap-7 mt-[48px]'>
                <p className='font-inter text-black font-bold text-[48px] leading-6'>{details?.name}</p>
                <div className='flex flex-col gap-[5px]'>
                    <p className='font-inter font-medium text-base text-NEUTRAL-100'>Gender:{" "} <span span className='capitalize'>{details?.gender || "Not Available"}</span></p>
                    <p className='font-inter font-medium text-base text-NEUTRAL-100'>Year of birth:{" "} <span>{details?.birth_year || "Not Available"}</span></p>
                    <p className='font-inter font-medium text-base text-NEUTRAL-100'>Skin Color:{" "} <span className='capitalize'>{details?.skin_color || "Not Available"}</span></p>
                    <p className='font-inter font-medium text-base text-NEUTRAL-100'>Height:{" "} <span className='capitalize'>{details?.height || "Not Available"} CM</span></p>
                </div>
            </div>
        </div>
    )
}

export default PeopleDetails