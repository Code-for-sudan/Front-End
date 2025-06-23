// src/hooks/useLogin.js
import { useMutation } from "@tanstack/react-query";
import api from "../api/Api";
import { TokenService } from "../auth/tokenService";

export const useLogin = () => {
  return useMutation({
    mutationFn: async ({ email, password, rememberMe }) => {
      const response = await api.post("/auth/login", { email, password });
      const { accessToken} = response.data;
      TokenService.setTokens(accessToken, rememberMe);
      return response.data;
    },
  });
};