import axios from "axios";
import api from "./Api";
import { TokenService } from "../auth/tokenService";


export const signupUser = async (formData) => {
  const response = await api.post("/auth/signup/user", formData);
  return response.data;
};

export const registerBusiness = async (data) => {
  const response = await axios.post('/auth/signup/business', data);
  return response.data;
};

export const login =  async ({ email, password, rememberMe }) => {
      const response = await api.post("/auth/login", { email, password });
      const { accessToken} = response.data;
      TokenService.setAccessToken(accessToken, rememberMe);
      return response.data;
};