import api from "../Api";

// delete product from the database
export const deleteProduct = async ({ id }) => {
  const response = await api.delete(`/products/${id}/`);
  return response.data;
};

// delete product offer
export const deleteProductOffer = async ({ id }) => {
  const response = await api.delete(`/products/${id}/offers/delete/`);
  return response.data;
};
