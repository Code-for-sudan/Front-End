import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { MainTitle, SearchBar } from '../../../components/store-owner/reusable';
import { AddProductBtn, ProductFilters } from '../../../components/store-owner/products';
import { ProductCardSkeleton } from '../../../components/loadings';

import { useGetProducts, useSearchProduct } from '../../../hooks/products';

const Products = () => {
  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  const [searchQuery, setSearchQuery] = useState("");
  const isSearching = searchQuery.trim().length >= 2;

  // Normal products
  const {
    data: productsData,
    fetchNextPage: fetchNextProducts,
    hasNextPage: hasNextProducts,
    isFetchingNextPage: fetchingNextProducts,
    isLoading: productsLoading,
    isError: productsError
  } = useGetProducts();

  // Search results
  const {
    data: searchData,
    fetchNextPage: fetchNextSearch,
    hasNextPage: hasNextSearch,
    isFetchingNextPage: fetchingNextSearch,
    isLoading: searchLoading,
    isError: searchError
  } = useSearchProduct(searchQuery, isSearching);

  const { ref, inView } = useInView();

  // Infinite scroll logic
  useEffect(() => {
    if (inView) {
      if (isSearching && hasNextSearch) {
        fetchNextSearch();
      } else if (!isSearching && hasNextProducts) {
        fetchNextProducts();
      }
    }
  }, [inView, isSearching, hasNextSearch, hasNextProducts, fetchNextSearch, fetchNextProducts]);

  // Search handler
  const handleSearch = (value) => {
    if (value.trim().length >= 2) {
      setSearchQuery(value);
    } else {
      setSearchQuery(""); // reset to normal mode
    }
  };

  // Flatten results depending on mode
  const allProducts = isSearching
    ? searchData?.pages.flatMap(page => page.results) || []
    : productsData?.pages.flatMap(page => page.results) || [];

  const loading = isSearching ? searchLoading : productsLoading;
  const error = isSearching ? searchError : productsError;
  const fetchingNext = isSearching ? fetchingNextSearch : fetchingNextProducts;

  return (
    <div className='container flex flex-col gap-6'>
      <MainTitle
        title={"إدارة المنتجات"}
        navigatePath={`/store-owner/${userId}/dashboard`}
      />

      <SearchBar
        placeholder={"بحث بإسم المنتج..."}
        handleSearch={handleSearch}
      />

      <AddProductBtn />

      {loading && !allProducts.length ? (
        <ProductCardSkeleton />
      ) : allProducts.length === 0 ? (
          <p className='text-center text-gray-600 mt-8'>
            {isSearching
              ? "هذا المنتج غير متوفر في متجرك"
              : "ليس لديك منتجات في متجرك"}
          </p>
      ) : (
        <ProductFilters products={allProducts} isLoading={loading} isError={error} />
      )}

      <div ref={ref} className="col-span-full -mt-18">
        {fetchingNext && <ProductCardSkeleton />}
      </div>
    </div>
  );
};

export default Products;
