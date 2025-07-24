import React, { useEffect, useState } from 'react'
import TopNavbar from '../../components/customer/customer-main/TopNavbar'
import SearchField from '../../components/customer/customer-main/SearchField'
import { useDebounce } from 'react-use';
import { searchProduct, fetchProducts } from '../../api/Api';
import { ArrowIcon } from '../../assets';

const CustomerDashboard = () => {

  // state for search field 
  const [searchTerm, setSearchTerm] = useState('');

  // state for error message
  const [errorMessage, setErrorMessage] = useState('');

  const [productList, setProductList] = useState([]);


  const [isLoading, setIsLoading] = useState(false);
  const [debounceSearchTerm, setDebounceSearchTerm] = useState('');

  // Debounc the search term to prevent making too many API requests
  // by waiting for the use to stop typing for 500ms
  useDebounce(() => setDebounceSearchTerm(searchTerm), 800, [searchTerm]);

  useEffect(() => {

    if (!debounceSearchTerm.trim()) {
      // use fetch product api instead of searchProduct

      const loadProducts = async () => {
        setIsLoading(true);
        const { data, error } = await fetchProducts();
        console.log(data)
        if (error) {
          setErrorMessage(error);
          setProductList([]);
        } else {
          setProductList(data || []);
          setErrorMessage('');
        }
        setIsLoading(false);
      }
      // fetchProducts().then(({ data, error }) => {
      //   if (error) {
      //     setErrorMessage(error);
      //     setProductList([]);
      //   } else {
      //     setProductList(data || []);
      //     setErrorMessage('');
      //   }
      // });
      loadProducts();
      return;
    }
    
    const loadSearchedproducts = async () => {
      setIsLoading(true);
      const { data, error } = await searchProduct(debounceSearchTerm);
      if (error) {
        setErrorMessage(error);
        setProductList([]);
      } else {
        setProductList(data.results || []);
        setErrorMessage('');
      }
      setIsLoading(false);
    }
    loadSearchedproducts();
  }, [debounceSearchTerm])


  useEffect(() => {




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
        {/* available categories */}
        <div className="w-full flex flex-col gap-2">
          <div className='w-full flex flex-row justify-between items-center'>
            <h3 className="text-[#FCA311CC]">احدث المنتجات</h3>
            <img src={ArrowIcon} className="w-6 h-6 text-[#FCA311CC] cursor-pointer" />
          </div>
          <div className="flex flex-col gap-2 overflow-hidden"> 
            {productList.length > 0 ? (
              productList.map((product) => (
                <div key={product.id} className="p-4 bg-white shadow rounded">
                  <h4 className="text-lg font-semibold">{product.name}</h4>
                  <p className="text-sm text-gray-600">{product.description}</p>
                </div>
              ))
            ) : (
              <p className="text-red-500">{errorMessage || 'لا توجد منتجات متاحة'}</p>
            )}  
          </div>
        </div>
      </div>
        

      </div>
    </div>
  )
}

export default CustomerDashboard
