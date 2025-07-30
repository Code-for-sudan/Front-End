import React, { useState } from 'react'
import NavBar from '../../components/customer/customer-main/NavBar'
import { products } from '../../assets/products';
import { useParams } from 'react-router-dom';

function ProductDetails() {

    // This component will display the details of a specific product
    // You can implement the product details logic here
    // parm = 
  const { id } = useParams(); // Assuming you are using react-router-dom to get the product ID from the URL
  const product = products.find(product => product.id === parseInt(id));

  const [details, setDetails] = useState(false)

  return (
    <div className="min-h-screen w-full flex flex-col">
      <NavBar title="تفاصيل المنتج" />
      <div className="w-full flex flex-col px-6 py-4">
        <div className="w-full flex flex-col gap-4 ">
          <div className="w-full flex flex-col items-left gap-4">
            <img 
              src={product?.images[0]} 
              alt={product?.title} 
              className="w-full h-64 object-contain mb-4"
            />
            <div className='w-full flex flex-col gap-5 py-6 px-6 bg-[#D9D9D926]'>
              <div className='w-full flex flex-col gap-1'>
                <h2 className="text-xl font-semibold text-gray-800">{product?.title}</h2>
                <p className="text-lg text-gray-600">السعر: {product?.price} جنيه</p>
              </div>

              <div className='w-full flex flex-col gap-1 '>
                <div className='flex flex-row gap-2 items-center justify-between py-2 border-b border-gray-300'>
                  <button className={`${details ? 'text-[#FCA311]': ''}`}>عن المنتج</button>
                  <button>التقيمات</button>
                </div>

                <div className='flex flex-col gap-1'>
                  {product?.store_name && <p className="text-sm text-gray-500">المتجر: {product.store_name}</p>}
                  {product?.size && <p className="text-sm text-gray-500">المقاس: {product.size}</p>}
                </div>

                <div className='flex flex-col gap-2'>
                  <h2 className="text-md text-gray-700">وصف المنتج:</h2>
                  <p className='text-gray-700'>{product?.description}</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default ProductDetails