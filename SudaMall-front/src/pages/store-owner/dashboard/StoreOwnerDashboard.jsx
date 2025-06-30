import React from 'react'
import { DashboardHead, Menu, MostSoldProducts, SalesChart } from '../../../components/store-owner/dashboard'
import Analytics from '../../../components/store-owner/dashboard/Analytics'
import { SalesAndCosts } from '../../../data/SalesAndCosts'

const StoreOwnerDashboard = () => {
  return (
    <div className='container'>
      <DashboardHead />
      <Menu />
      <Analytics />
      <div className='w-full'>
        <h2 className='text-base font-bold mt-10 mb-4'>إجمالي المبيعات / التكلفة</h2>
        <SalesChart SalesAndCosts={SalesAndCosts} />
      </div>
      <MostSoldProducts />
    </div>
  )
}

export default StoreOwnerDashboard
