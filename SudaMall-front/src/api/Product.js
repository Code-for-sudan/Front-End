import api from "./Api";
import axios from "axios"; 


/** 
* Request a list of products based on search term.
*/

export const searchProduct = async (query, page = 1) => {
  try {

    const response = await axios.get(`https://sudamall.ddns.net/api/v1/search/products`, {
      params: { 
        q: query,
        page: page,
       },
    });

    // if (!response.ok) {
    //   throw new Error('Failed to fetch products')
    // }
    // const data = await response.json()
    const data = response.data;

    if (data.Response === 'False') {
      throw new Error(data.Error || 'No products found');
    }
    return { data }
  } catch(error) {
    console.log("Error fetching products:", error);
    return {
      error: error.message || 'An error occurred while fetching products'
    }
  }
}

api.searchProduct = searchProduct;


export const fetchProducts = async (category = '') => {
  try {

    const response = await axios.get(`https://sudamall.ddns.net/api/v1/products`, {
      params: { 
       },
    });

    // if (!response.ok) {
    //   throw new Error('Failed to fetch products')
    // }
    // const data = await response.json()
    const data = response.data;
    console.log(response)

    if (data.Response === 'False') {
      throw new Error(data.Error || 'No products found');
    }
    return { data }
  } catch(error) {
    console.log("Error fetching products:", error);
    return {
      error: error.message || 'An error occurred while fetching products'
    }
  }
}

api.fetchProducts = fetchProducts;



export const getProductDetails = async (id) => {
  try {

    const response = await axios.get(`https://sudamall.ddns.net/api/v1/products/${id}`, {
    });

    const data = response.data;
    if (data.Response === 'False') {
      throw new Error(data.Error || 'No products found');
    }
    return { data }
  } catch(error) {
    console.log("Error fetching products:", error);
    return {
      error: error.message || 'An error occurred while fetching products'
    }
  }
}

api.getProductDetails = getProductDetails;

