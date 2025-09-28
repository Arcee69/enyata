import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

import Cover from "../../assets/png/cover.png"

const FilmDetails = () => {
    const [details, setDetails] = useState([])

    const { state } = useLocation()


    const getDetails = async () => {
        try {
            const res = await axios.get(`${state}`)
            setDetails(res?.data || [])
        } catch (err) {
            console.log(err, "misk")
        }
    }

    useEffect(() => {
        getDetails()
    }, [state])

    return (
        <div className='w-full flex mt-[108px] items-start gap-[28px]'>
            <img src={Cover} alt='Cover' className='w-[318px] h-[450px]' />
            <div className='flex flex-col gap-7 mt-[48px]'>
                <p className='font-inter text-black font-bold text-[48px] leading-6'>{details?.title}</p>
                <div className='flex flex-col gap-[5px]'>
                    <p className='font-inter font-medium text-base text-NEUTRAL-100'>Director:{" "} <span>{details?.director || "Not Available"}</span></p>
                    <p className='font-inter font-medium text-base text-NEUTRAL-100'>Producer:{" "} <span>{details?.producer || "Not Available"}</span></p>
                    <p className='font-inter font-medium text-base text-NEUTRAL-100'>
                        Release Date:{" "}
                        <span>
                            {details?.release_date
                                ? new Date(details.release_date).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })
                                : "Not Available"}
                        </span>
                    </p>

                </div>
            </div>
        </div>
    )
}

export default FilmDetails