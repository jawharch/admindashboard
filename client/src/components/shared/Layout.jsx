import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../Header'
import { Sidebar } from '../Sidebar'

export const Layout = () => {
  return (
    <div className='flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden'>
        <Sidebar/>
        <div className='flex-1'>
        <Header />
        <div className='p-4'>
            <Outlet />
        </div>

        </div>

        
        
        
    </div>
    
  )
}
