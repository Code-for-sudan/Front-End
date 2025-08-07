import api from "../Api.js";

export const updateProduct = async ({ productId, productData }) => {
  const formData = new FormData();

  const fieldsToAppend = [
    "product_name",
    "product_description",
    "brand",
    "price",
    "classification",
    "category",
    "has_sizes",
    // "picture",
    "color",
    "available_quantity",
  ];

  fieldsToAppend.forEach((key) => {
    if (productData[key] !== undefined && productData[key] !== null) {
      formData.append(key, productData[key]);
    }
  });

  // Sizes
  if (productData.has_sizes === "true" || productData.has_sizes === true) {
    if (productData.sizes) {
      formData.append("sizes", JSON.stringify(productData.sizes));
    }
  }

  // Tags (as array)
  if (productData.tags && productData.tags.length > 0) {
    formData.append("tags", JSON.stringify(productData.tags));
  }

  // Offer (nested object)
  if ((productData.offer.start_date && productData.offer.end_date && productData.offer.offer_price) !== ""  ) {
    formData.append("offer", JSON.stringify(productData.offer));
  }

  console.log("FormData content:");
  for (let [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }

  // Send PUT request
  const response = await api.patch(`/products/${productId}/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};
