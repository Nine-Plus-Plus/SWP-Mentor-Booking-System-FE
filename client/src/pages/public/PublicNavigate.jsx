import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import path from '../../utils/path'
import clsx from 'clsx'

const PublicNavigate = () => {
    const navItem = 'text-xl font-semibold text-main-1 text-center w-[150px]'
    const navItemClick= 'border-b-4 border-main-1 font-black'
    const location = useLocation()
    const [variant, setVariant] = useState(location.pathname)
    useEffect(() => {
        setVariant(location.pathname)
    }, [location.pathname])
    
    console.log(location.pathname)
    return (
        <div className='w-full h-[8vh] p-2 px-5 flex flex-wrap items-center justify-between border-b'>
            <div className=' h-[6vh] flex flex-row items-center'>
                <NavLink className='flex flex-row items-center h-[6vh] gap-3'
                    to={'.'}
                    onClick={() => { setVariant('/public') }}
                >
                    <img src='logoFPT.svg' className='object-cover h-full' />
                </NavLink>
            </div>
            <div className='flex gap-5 h-[7vh] '>
                <NavLink
                    to={'.'}
                    className={clsx(navItem, variant === '/public' && navItemClick)}
                    onClick={() => { setVariant('/public') }}
                >
                    <div className="flex items-center justify-center h-[6vh]">
                        <span className="text-center">
                            Public Home
                        </span>
                    </div>
                </NavLink>
                <NavLink
                    to={path.ABOUT_US}
                    className={clsx(navItem, variant === '/public/about-us' && navItemClick)}
                    onClick={() => { setVariant('/public/about-us') }}
                >
                    <div className="flex items-center justify-center h-[6vh]">
                        <span className="text-center">
                            About Us
                        </span>
                    </div>
                </NavLink>
                <NavLink
                    to={path.LOGIN}
                    className={clsx(navItem, variant === '/public/login' && navItemClick)}
                    onClick={() => { setVariant('/public/login') }}
                >
                    <div className="flex items-center justify-center h-[6vh]">
                        <span className="text-center">
                            Login
                        </span>
                    </div>
                </NavLink>
            </div>
        </div>
    )
}

export default PublicNavigate