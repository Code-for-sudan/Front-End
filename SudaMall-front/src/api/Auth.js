import axios from "./axios";

export const signupUser = async (formData) => {
  const response = await axios.post("http://localhost:8000/vi/api/auth/signup/user", formData);
  return response.data;
};

export const registerBusiness = async (data) => {
  const response = await axios.post('http://localhost:8000/vi/api/auth/signup/business', data);
  return response.data;
};