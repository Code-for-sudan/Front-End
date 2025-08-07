import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getAllProducts, getProduct } from '../api/products/getProducts.js';

// get all products hook
export const useGetProducts = () => {
  return useInfiniteQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
    getNextPageParam: (lastPage, allPages) => {
      // Extract the page number from the 'next' URL
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        const page = url.searchParams.get('page');
        return page ? Number(page) : undefined;
      }
      return undefined; // No more pages
    }
  });
};

// get single product hook
export const useGetSingleProduct = (id) => {
  return useQuery({
    queryKey: ['product', id], // unique key for each product
    queryFn: () => getProduct({ id }), // pass the ID to your fetch function
    enabled: !!id, // only fetch if ID is provided (prevents calling it with undefined)
  });
};
