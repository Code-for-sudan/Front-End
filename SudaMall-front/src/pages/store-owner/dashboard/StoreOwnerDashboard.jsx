import React from 'react'
import { DashboardHead, Menu, MostSoldProducts, SalesChart } from '../../../components/store-owner/dashboard'
import Analytics from '../../../components/store-owner/dashboard/Analytics'

const StoreOwnerDashboard = () => {
  return (
    <div className='container'>
      <DashboardHead />
      <Menu />
      <Analytics />
      <SalesChart />
      <MostSoldProducts />
    </div>
  )
}

export default StoreOwnerDashboard
