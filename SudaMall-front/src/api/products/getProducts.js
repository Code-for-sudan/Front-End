import api from "../Api";

// get Products api
export const getAllProducts = async ({ pageParam = 1 }) => {
  const response = await api.get(`/products/my-products/?sort=recent&page=${pageParam}`);
  return response.data;
};

// get single Product by id
export const getProduct = async ({ id }) => {
  const response = await api.get(`/products/${id}/`);
  console.log(response)
  return response.data;
};
