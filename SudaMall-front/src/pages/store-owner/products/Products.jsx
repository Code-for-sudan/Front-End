import { useInView } from 'react-intersection-observer';

import { MainTitle } from '../../../components/store-owner/reusable';
import { SearchBar } from '../../../components/store-owner/reusable';
import { AddProductBtn, ProductFilters } from '../../../components/store-owner/products';

import { ProductCardSkeleton } from '../../../components/loadings';
import { useGetProducts } from '../../../hooks/useGetProducts';
import { useEffect } from 'react';

const Products = () => {
  const userId = JSON.parse(localStorage.getItem("user"))?.id;

    const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useGetProducts();

  const { ref, inView } = useInView();

  useEffect(() => {
      if (inView && hasNextPage) {
        fetchNextPage();
      }
    }, [inView, hasNextPage, fetchNextPage]);

  // Flatten the paginated product results into a single array
  const allProducts = data?.pages.flatMap(page => page.results);

  return (
    <div className='container flex flex-col gap-6'>
      <MainTitle
        title={"إدارة المنتجات"}
         navigatePath={`/store-owner/${userId}/dashboard`} />
      <SearchBar />
      <AddProductBtn />
      <ProductFilters 
          products={allProducts}
          isLoading={isLoading}
          isError={isError} 
      />
      
      {/* This div will be observed to trigger the next page */}
      <div ref={ref} className="col-span-full -mt-18">
        {isFetchingNextPage && <ProductCardSkeleton />}
      </div>
    </div>
  )
}

export default Products;
