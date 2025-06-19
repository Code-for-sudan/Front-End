import api from "./Api";



export const signupUser = async (formData) => {
  const response = await api.post("/auth/signup/user", formData);
  return response.data;
};

export const registerBusiness = async (data) => {
  const response = await api.post('/auth/signup/business', data);
  return response.data;
};