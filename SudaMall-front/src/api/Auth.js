import api from "./Api";
import { TokenService } from "../auth/tokenService";
import axios from "axios";
import { toast } from "react-toastify";


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
      const { access_token} = response.data;
      TokenService.setAccessToken(access_token, rememberMe);
      return response.data;
};


export const resendVerification = async (email) => {
  try {
    const res = await axios.post("https://sudamall.ddns.net/api/v1/resend-verification/", { email });
    toast.success(res.data.message || "تم إرسال رابط التفعيل مرة أخرى بنجاح..");
  } catch (error) {
    const msg = error.response?.data?.message || "حدث خطأ أثناء محاولة إعادة إرسال رابط التفعيل.";
    toast.error(msg);
  }
};

export const verifyAccount = async (token) => {
  const response = await axios.post("https://sudamall.ddns.net/api/v1/activate-account/", { token });
  return response.data;
};