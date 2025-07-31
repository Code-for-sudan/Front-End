import React, { useEffect, useState } from 'react'
import TopNavbar from '../../components/customer/customer-main/TopNavbar'
import SearchField from '../../components/customer/customer-main/SearchField'
import { useDebounce } from 'react-use';
import { searchProduct, fetchProducts } from '../../api/Api';
import { ArrowIcon } from '../../assets';
import ProductCard from '../../components/customer/product/ProductCard';
// import { products } from '../../assets/products';

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
    // const data = products; // Mock data for now
    // setProductList(data || []);
    // setErrorMessage('');
    console.log(data.results)
    if (error) {
      setErrorMessage(error);
      setProductList([]);
    } else {
      setProductList(data.results || []);
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
      // const data = { results: products.filter(product => product.title.toLowerCase().includes(debounceSearchTerm.toLowerCase())) };
      console.log(data.results)
      setSearchResults(data.results || []);
      setErrorMessage('');
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
                      id={product.id}
                      name={product.product_name}
                      price={product.price}
                      picture={product.picture}
                      // store_name={product?.store_name}
                      // size={product.size}
                    />
                  ))}
                </div>
              </div>
            ) : (searchResults.length <= 0 && searchTerm.trim().size < 1) ? (
                <p className="text-red-500">{'لا توجد نتائج بحث'}</p>
            ): (
              <div className="w-full flex flex-col gap-2">
                <div className='w-full flex flex-row justify-between items-center'>
                  <h3 className="text-[#FCA311CC] text-xl">احدث المنتجات</h3>
                  <img src={ArrowIcon} className="s-8 text-[#FCA311CC] cursor-pointer" />
                </div>
                <div className="grid grid-cols-2 gap-4 overflow-hidden"> 
                  {productList.length > 0 ? (
                    productList.map((product) => (
                      <ProductCard 
                        key={product.id}
                        id={product.id}
                        name={product.product_name}
                        price={product.price}
                        picture={product.picture}
                        store_name={product.store_name}
                        size={product.size}
                        favorite={product.is_favorite}
                      />
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
