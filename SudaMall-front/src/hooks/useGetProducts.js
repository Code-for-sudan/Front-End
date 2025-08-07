import { useInfiniteQuery } from '@tanstack/react-query';
import { getAllProducts } from '../api/products/getProducts.js';

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
