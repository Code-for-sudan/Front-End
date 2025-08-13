import React, { useState } from 'react'
import NavBar from '../../components/customer/customer-main/NavBar'
import { products } from '../../assets/products';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getProductDetails } from '../../api/Product';
import { FiPlus, FiMinus } from "react-icons/fi";
import { FiShoppingCart } from "react-icons/fi";


function ProductDetails() {

    // This component will display the details of a specific product
    // You can implement the product details logic here
    // parm = 
  const { id } = useParams(); // Assuming you are using react-router-dom to get the product ID from the URL
  const [details, setDetails] = useState(true)
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(null)
  const [isFavorite, setIsFavorite] = useState(false)

  const handleFavoriteToggle = (newValue) => {
    setIsFavorite(newValue)
  }

  useEffect(() => {
    const loadProductDetails = async () => {
      const { data, error } = await getProductDetails(id);
      if (error) {
        console.error("Error fetching product details:", error);
      } else {
        setProduct(data || {});
        setIsFavorite(data.is_favorite)
      if (data?.sizes && data.sizes.length > 0) {
        setSize(data.sizes[0]);
      }
        console.log("Product details loaded:", data);
      }
    };

    loadProductDetails();
  }, [])
 

  const handleQuantity = (sign) => {
    if (sign === '-') {
      if (quantity <= 0) 
        return
      setQuantity(quantity - 1)
      return
    } 
    setQuantity(quantity + 1)
  }


  return (
    <div className="relative min-h-screen w-full flex flex-col">
      <NavBar 
        style='fixed top-0 left-0 right-0 z-10 margin-bottom-4 bg-white p-4 max-w-2xl mx-auto'
        title="تفاصيل المنتج" 
        isFavorite={isFavorite} 
        handleFavoriteToggle={handleFavoriteToggle} 
      />
      <div className="w-full flex flex-col px-6 mt-18">
        <div className="w-full flex flex-col gap-4 pt-4">
          <div className="w-full flex flex-col items-left gap-4">
            <img 
                src={`https://sudamall.ddns.net${product.picture}`}
                alt={product.product_name}
              className="w-full h-64 object-cover mb-4"
            />
            <div className='w-full flex flex-col gap-1'>
                <h2 className="text-xl font-semibold text-gray-800">{product?.product_name}</h2>
                <p className="text-lg text-gray-600">السعر: {product?.price} جنيه</p>
            </div>
            <div className='w-full flex flex-col gap-5 py-6 px-6 bg-[#D9D9D926]'>



              <div className='w-full flex flex-col gap-8'>
                <div className='w-full flex flex-row items-center justify-between py-2 px-2  border-gray-300'>
                  <button 
                    onClick={() => setDetails(true)}
                    className={`${details ?  'text-[#FCA311]': ''} w-1/2 border-b py-2`}>عن المنتج</button>
                  <button 
                    onClick={() => setDetails(false)}
                    className={`${!details ?  'text-[#FCA311]': ''} w-1/2 border-b py-2`}>التقيمات
                    </button>
                </div>
              {
                details ?  (

                    <div className='w-full flex flex-col gap-4'>
                      {/* Prouct description */}
                      <div className='flex flex-col gap-2'>
                        <h2 className="text-md text-gray-900">وصف المنتج:</h2>
                        <p className='text-gray-700'>{product.product_description}</p>
                      </div>
                      
                      {/* Product quantity */}
                      <div className='flex flex-col gap-4'>
                        <p className='text-lg'>الكمية</p>
                        <div className='w-full flex flex-row items-center justify-center gap-2'>
                          <button 
                            onClick={() => handleQuantity('+')}
                            className='py-3 px-4 border border-gray-300 rounded-md'>
                            <FiPlus className='text-md'/>
                          </button>
                          <input 
                            type="number" 
                            value={quantity} 
                            onChange={(e) => setQuantity(e.target.value)} 
                            className='w-2/4 p-2 border border-gray-300 rounded-md text-center'
                            min="1"
                          />
                          <button
                            onClick={() => handleQuantity('-')}
                            className='py-3 px-4 border border-gray-300 rounded-md'>
                            <FiMinus className='text-md'/>
                          </button>
                        </div>
                      </div>

                      {/* Product available sizes */}
                      {product.sizes && product.sizes.length > 0 && (
                        <div className='flex flex-col gap-4'>
                          <p className='text-lg'>المقاسات المتوفرة</p>
                          <div className='w-full flex flex-row items-center justify-center gap-2 flex-wrap'>
                            {product.sizes.map((item, index) => (
                              <button
                                key={index}
                                className={`px-4 py-2 border rounded-md text-sm focus:outline-none
                                  hover:bg-[#FCA311] hover:text-white
                                  ${item.size === size.size ? 'bg-[#FCA311] text-white' : 'text-gray-800'}`}
                                onClick={() => setSize(item)}
                              >
                                {item.size.toUpperCase()}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className='w-full flex flex-col gap-4'>
                      لا توجد تقيمات
                    </div>
                  )
              }



                {/* <div className='flex flex-col gap-1'>
                  {product?.store_name && <p className="text-sm text-gray-500">المتجر: {product.store_name}</p>}
                </div> */}
              </div>

            </div>
          </div>
        </div>
      </div>
      <div className='fixed bottom-0 z-10 margin-bottom-4 bg-white py-4 px-6 max-w-2xl mx-auto w-full flex flex-row items-center gap-2'>
        <button
          className='w-7/8 flex flex-row items-center justify-center bg-[#FCA311] text-white py-3 rounded-md'
          onClick={() => console.log('Buy now', { product, quantity, size })}
          >
            <span className='text-md'>شراء الآن</span>
        </button>
        <button
          className='w-1/8 flex flex-row items-center justify-center border-[#FCA311] border-1 text-[#FCA311] py-3 rounded-md'
          onClick={() => console.log('Add to cart', { product, quantity, size })}>
            <FiShoppingCart className='size-6'/>
        </button>
      </div>

    </div>
  )
}

export default ProductDetails