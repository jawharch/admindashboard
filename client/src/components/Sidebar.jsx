import React from 'react'
import { FcCustomerSupport } from "react-icons/fc";
import { DASHBOARD_SIDEBAR_BOTTOM_LINKS, DASHBOARD_SIDEBAR_LINKS } from '../lib/consts/navigation';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { HiOutlineLogout } from 'react-icons/hi';

export const Sidebar = () => {

    const LinkClass='text-white flex items-center gap-2 font-light px-3 p-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'
    const pathname=useLocation()
    
  return (
    <div className='flex flex-col bg-neutral-900 w-60 p-3'>
    <Link className='flex items-center gap-2 mx-4 no-underline'>
    <FcCustomerSupport fontSize={32} />
    <span className='text-2xl font-bold text-neutral-100'>Shein</span>

    </Link>
        <div className='flex-1 py-8 flex flex-col gap-1'>
        {
            DASHBOARD_SIDEBAR_LINKS.map((item) =>
            (
                <Link to={item.path} key={item.key} className={classNames(pathname.pathname===item.path ?'bg-neutral-600' :'',LinkClass)}>
                <span className='text-xl'>
                {item.icon}

                </span>
                {
                    item.label
                }

                </Link>
            )
            )
        }
            
        </div>
        <div className='flex flex-col gap-1 pt-2 border-t border-neutral-700'>
        {
            DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) =>
            (
                <Link to={item.path} key={item.key} className={classNames(item.label==='Logout'? 'text-red-500':'',pathname.pathname===item.path ?'bg-neutral-600' :'',LinkClass)}>
                <span className='text-xl'>
                {item.icon}

                </span>
                {
                    item.label
                }

                </Link>
            )
            )
        }
       
        </div>
    </div>
  )
}
