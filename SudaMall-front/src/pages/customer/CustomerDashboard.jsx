import React, { useEffect, useState } from 'react'
import TopNavbar from '../../components/customer/customer-main/TopNavbar'
import SearchField from '../../components/customer/customer-main/SearchField'
import { useDebounce } from 'react-use';
import { searchProduct, fetchProducts } from '../../api/Api';
import { ArrowIcon } from '../../assets';
import ProductCard from '../../components/customer/product/ProductCard';

const CustomerDashboard = () => {

  // state for search field 
  const [searchTerm, setSearchTerm] = useState('');

  // state for error message
  const [errorMessage, setErrorMessage] = useState('');

  const [productList, setProductList] = useState([]);

  const [searchResults, setSearchResults] = useState([]);


  const [isLoading, setIsLoading] = useState(false);
  const [debounceSearchTerm, setDebounceSearchTerm] = useState('');

  // Debounc the search term to prevent making too many API requests
  // by waiting for the use to stop typing for 500ms
  useDebounce(() => setDebounceSearchTerm(searchTerm), 800, [searchTerm]);


  // use fetch product api instead of searchProduct
  const loadProducts = async () => {
    setIsLoading(true);
    const { data, error } = await fetchProducts();
    if (error) {
      setErrorMessage(error);
      setProductList([]);
    } else {
      setProductList(data || []);
      setErrorMessage('');
    }
    setIsLoading(false);
  }

  useEffect(() => {

    if (!debounceSearchTerm.trim()) {
      setSearchResults([]);
      setErrorMessage(errorMessage);
      setIsLoading(false);
      setProductList(productList);
      return;
    }
    
    const loadSearchedproducts = async () => {
      setIsLoading(true);
      const { data, error } = await searchProduct(debounceSearchTerm);
      console.log(data)
      if (error) {
        setErrorMessage(error);
        setSearchResults([]);
      } else {
        setSearchResults(data.results || []);
        setErrorMessage('');
      }
      setIsLoading(false);
    }
    loadSearchedproducts();
  }, [debounceSearchTerm])


  useEffect(() => {
    loadProducts();
  }, [])



  return (
    <div className="min-h-screen w-full flex flex-col">
      <TopNavbar />

      <div className="w-full flex flex-col px-6 py-4">

        <div className='w-full flex flex-col gap-2'>
          <div className="flex flex-col gap-1">
            <h3 className="text-[#FCA311CC]">أهلاً</h3>
            <p className="text-xs text-[#757575]">مرحباً بك في سودا مول</p>
          </div>

          {/* Search field */}
          <SearchField
            placeholder="أبحث"
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>

        <div className='w-full flex flex-col gap-4 mt-5'>

          {/* Search result */}

          {isLoading && <p className="text-center text-gray-500">جاري تحميل المنتجات...</p>}


          {
            (!isLoading && searchResults.length > 0) ? (
              <div className='w-full flex flex-col gap-2'>
                <div className='w-full flex flex-row justify-between items-center'>
                  <h3 className="text-[#FCA311CC]">نتائج البحث</h3>
                  {/* <img src={ArrowIcon} className="w-6 h-6 text-[#FCA311CC] cursor-pointer" /> */}
                </div>
                <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4'>
                  {searchResults.map((product) => (

                    <ProductCard 
                      key={product.id}
                      name={product.product_name}
                      price={product.price}
                      picture={product.picture}
                      store_name={product.store_name}
                      size={product.size}
                    />
                    // <div key={product.id} className="p-4 bg-white shadow rounded">
                    //   <h4 className="text-lg font-semibold">{product.product_name}</h4>
                    //   <p className="text-sm text-gray-600">{product.product_description}</p>
                    // </div>
                  ))}
                </div>

              </div>
            ) : (
              <div className="w-full flex flex-col gap-2">
                <div className='w-full flex flex-row justify-between items-center'>
                  <h3 className="text-[#FCA311CC]">احدث المنتجات</h3>
                  <img src={ArrowIcon} className="w-6 h-6 text-[#FCA311CC] cursor-pointer" />
                </div>
                <div className="flex flex-col gap-2 overflow-hidden"> 
                  {productList.length > 0 ? (
                    productList.map((product) => (
                      <div key={product.id} className="p-4 bg-white shadow rounded">
                        <h4 className="text-lg font-semibold">{product.product_name}</h4>
                        <p className="text-sm text-gray-600">{product.product_description}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-red-500">{errorMessage || 'لا توجد منتجات متاحة'}</p>
                  )}  
                </div>
              </div>
            )
          }


        </div>
        

      </div>
    </div>
  )
}

export default CustomerDashboard
