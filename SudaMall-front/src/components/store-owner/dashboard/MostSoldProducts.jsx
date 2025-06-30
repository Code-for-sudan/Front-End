import React from 'react'
import { Most_Sold_Products } from '../../../data/MostSoldProducts'

const MostSoldProducts = () => {
  return (
   <div className="overflow-x-auto mt-6 mb-32">
      <h2 className='text-xl font-bold mb-4'>أكثر المنتجات مبيعا</h2>
<<<<<<< HEAD
      <div className="overflow-x-auto  rounded-md border border-primary">
        <table className="w-full border border-primary rounded-md overflow-hidden text-[0.68rem]">
=======
      <div className="overflow-x-auto  rounded-sm border border-primary">
        <table className="w-full border border-primary rounded-sm overflow-hidden text-[0.6rem]">
>>>>>>> main
            <thead>
                <tr className="bg-light-gold text-black text-right font-semibold">
                <th className="px-2 py-1 border-l border-primary">اسم المنتج</th>
                <th className="px-2 py-1 border-l border-primary">عدد الطلبات</th>
                <th className="px-2 py-1 border-l border-primary">الحالة</th>
                <th className="px-2 py-1">السعر</th>
                </tr>
            </thead>
            <tbody>
                {Most_Sold_Products.map((product, index) => (
                <tr key={product.product_id} className="text-right bg-white border-t border-primary">
                    <td className="px-2 py-1 border-l border-primary">{product.product_name}</td>
                    <td className="px-2 py-1 border-l border-primary">{product.orders_count}</td>
                    <td className="px-2 py-1 border-l border-primary">
                    <span
                        className={`px-2 py-1 text-[8px] rounded-full font-medium ${
                        product.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}
                    >
                        {product.status === 'available' ? 'متوفر' : 'غير متوفر'}
                    </span>
                    </td>
                    <td className="p-3">{product.price.toLocaleString()}ج</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    </div>
  )
}

export default MostSoldProducts
