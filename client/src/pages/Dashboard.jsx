import React from 'react'
import { DashboardStats } from '../components/DashboardStats'
import { TransactionChart } from '../components/TransactionChart'
import { RecentOrders } from '../components/RecentOrders'

export const Dashboard = () => {
  return (
    <div className="flex flex-col gap-4 h-full ">
    <DashboardStats />
    <div className="flex flex-row w-full  h-full">
        <TransactionChart />
        
    </div>
   
        
        
    
   
    <div className="  h-full  w-full">
				<RecentOrders />
				
			</div>


       
        
    
</div>


  )
}
