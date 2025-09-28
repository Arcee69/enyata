import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import Star from "../../assets/png/star.png"

const StarshipsDetails = () => {
  const [details, setDetails] = useState({})
  const [pilots, setPilots] = useState([])

  const { state } = useLocation()

  const getDetails = async () => {
    try {
      const res = await axios.get(state)
      setDetails(res?.data || {})

      // If pilots exist, fetch their names
      if (res?.data?.pilots?.length) {
        const pilotRequests = res.data.pilots.map((url) => axios.get(url))
        const pilotResponses = await Promise.all(pilotRequests)
        setPilots(pilotResponses.map((p) => p.data.name))
      }
    } catch (err) {
      console.log(err, "misk")
    }
  }

  useEffect(() => {
    getDetails()
  }, [state])

  return (
    <div className='w-full mt-[108px] flex items-start gap-[28px]'>
      <img src={Star} alt='Star' className='w-[318px] h-[450px]' />
      <div className='flex flex-col gap-7 mt-[48px]'>
        <p className='font-inter text-black font-bold text-[48px] leading-6'>
          {details?.name}
        </p>
        <div className='flex flex-col gap-[5px]'>
          <p className='font-inter font-medium text-base text-NEUTRAL-100'>
            Model: <span className='capitalize'>{details?.model || "Not Available"}</span>
          </p>
          <p className='font-inter font-medium text-base text-NEUTRAL-100'>
            Passengers: <span>{details?.passengers || "Not Available"}</span>
          </p>
          <p className='font-inter font-medium text-base text-NEUTRAL-100'>
            Pilots:{" "}
            <span className='capitalize'>
              {pilots.length ? pilots.join(", ") : "Not Available"}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default StarshipsDetails
