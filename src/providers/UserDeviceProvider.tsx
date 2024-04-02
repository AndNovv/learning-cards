"use client"
import useMediaQuery from '@/hooks/useMediaQuery'
import { setVisibility, setDevice } from '@/state/asideMenu/asideMenuSlice'
import { AppDispatch } from '@/state/store'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const UserDeviceProvider = ({ children }: { children: React.ReactNode }) => {

    const isDesktop = useMediaQuery("(min-width: 768px)")

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(setVisibility(isDesktop))
        dispatch(setDevice(isDesktop))
    }, [isDesktop, dispatch])


    return (
        <>
            {children}
        </>
    )
}

export default UserDeviceProvider