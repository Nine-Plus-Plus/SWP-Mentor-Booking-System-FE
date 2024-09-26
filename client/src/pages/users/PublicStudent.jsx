
import React, { useEffect, useState } from 'react'
import { Navigation } from '../../components/index' 
import { Outlet } from 'react-router-dom'
import { useUserStore } from '../../store/useUserStore'
import clsx from 'clsx'


const PublicStudent = () => {
  const { resetUserStore, token } = useUserStore()

    return (
      <div className='w-full flex-wrap flex justify-end'>
        <Navigation>
          <Outlet />
        </Navigation>
      </div>
    )
}

export default PublicStudent 