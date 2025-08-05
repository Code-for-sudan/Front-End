import api from './Api.js'; // 👈 import your custom axios instance

export const createProduct = async (productData) => {
  const formData = new FormData();

  const fieldsToAppend = [
    'product_name', 'product_description', 'brand', 'price',
    'type', 'category', 'has_sizes', 'picture',
     , 'color', 'available_quantity'
  ];

  fieldsToAppend.forEach((key) => {
    if (productData[key] !== undefined && productData[key] !== null) {
      formData.append(key, productData[key]);
    }
  });

  if (productData.has_sizes === 'true' || productData.has_sizes === true) {
    productData.sizes?.forEach((item, i) => {
      formData.append(`sizes[${i}][size]`, item.size);
      formData.append(`sizes[${i}][available_quantity]`, Number(item.quantity));
    });
  }

  // send to the backend server
  const response = await api.post('/products/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response;
};
