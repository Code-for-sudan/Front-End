import api from "../Api.js";

// create product function
export const createProduct = async (productData) => {
  const formData = new FormData();

  const fieldsToAppend = [
    "product_name",
    "product_description",
    "brand",
    "price",
    "classification",
    "category",
    "has_sizes",
    "picture",
    ,
    "color",
  ];

  fieldsToAppend.forEach((key) => {
    if (productData[key] !== undefined && productData[key] !== null) {
      formData.append(key, productData[key]);
    }
  });

  // append sizes
  if (productData.has_sizes === "true" || productData.has_sizes === true) {
    if (productData.sizes) {
      formData.append("sizes", JSON.stringify(productData.sizes));
    }
  } else {
    if (productData.available_quantity) {
      formData.append("available_quantity", productData.available_quantity);
    }
  }

  // append tags to form data
  if (productData.tags && productData.tags.length > 0) {
    formData.append("tags", JSON.stringify(productData.tags));
  }

  // send to the backend server
  const response = await api.post("/products/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  console.log("create product: ",response)
  return response;
};
