import api from "../Api";

// Search for Product by name
export const SearchProduct = async ({ search_query, pageParam = 1 }) => {
  const response = await api.get(`/search/products/?q=${search_query}&p=${pageParam}`);
  console.log(response)
  return response.data;
};
