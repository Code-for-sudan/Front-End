import React, { useEffect, useState } from 'react'
import TopNavbar from '../../components/customer/customer-main/TopNavbar'
import SearchField from '../../components/customer/customer-main/SearchField'
import { useDebounce } from 'react-use';
import { fetchProducts } from '../../api/Api';

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
    if (!debounceSearchTerm.trim()) return;
    
    const loadproducts = async () => {
      setIsLoading(true);

      const { data, error } = await fetchProducts(debounceSearchTerm);
      console.log(data, error)
      if (error) {
        setErrorMessage(error);
        setProductList([]);
      } else {
        setProductList(data.products || []);
        setErrorMessage('');
      }
      setIsLoading(false);
    }
    loadproducts();
    console.log(productList);
    console.log(debounceSearchTerm)
  }, [debounceSearchTerm])



  return (
    <div className="min-h-screen flex flex-col">
      <TopNavbar />

      <div className="flex flex-col px-6 py-4 gap-6">
        {/* welcome message */}
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
    </div>
  )
}

export default CustomerDashboard
