import api from "../Api";

const deleteRequest = async (url) => {
  const { data } = await api.delete(url);
  return data;
};

// delete product from the database
export const deleteProduct = ({ id }) =>
  deleteRequest(`/products/${id}/`);

// delete product offer
export const deleteProductOffer = ({ id }) =>
  deleteRequest(`/products/${id}/offers/delete/`);

// delete Product size if it has
export const deleteProductSize = ({ ProductId, SizeId }) =>
  deleteRequest(`/products/${ProductId}/sizes/${SizeId}/delete/`);

