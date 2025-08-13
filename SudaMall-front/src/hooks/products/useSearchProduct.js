import { useInfiniteQuery } from '@tanstack/react-query';
import { SearchProduct } from '../../api/products/SearchProduct.js';

export const useSearchProduct = (searchQuery, enabled = false) => {
  return useInfiniteQuery({
    queryKey: ['searchProducts', searchQuery],
    queryFn: ({ pageParam = 1 }) =>
      SearchProduct({ search_query: searchQuery, pageParam }),
    enabled: enabled && !!searchQuery?.trim(), // run only if search is enabled & query exists
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        const page = url.searchParams.get('p'); // matches ?p= param
        return page ? Number(page) : undefined;
      }
      return undefined;
    }
  });
};
