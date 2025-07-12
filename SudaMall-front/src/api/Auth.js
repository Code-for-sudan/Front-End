import api from "./Api";
import { TokenService } from "../auth/tokenService";
import axios from "axios";


export const signupUser = async (formData) => {
  const response = await axios.post("https://sudamall.ddns.net/api/v1/accounts/signup/user/", formData);
  return response.data;
};

export const registerBusiness = async (formData2) => {
  const response = await axios.post('https://sudamall.ddns.net/api/v1/accounts/signup/business/', formData2);
  return response.data;
};

export const login =  async ({ email, password, rememberMe }) => {
      const response = await api.post("/auth/login/", { email, password });
      const { access} = response.data;
      TokenService.setAccessToken(access, rememberMe);
      return response.data;
};