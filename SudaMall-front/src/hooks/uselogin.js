// src/hooks/useLogin.js
import { useMutation } from "@tanstack/react-query";
import api from "../api/axios";
import { TokenService } from "../auth/tokenService";

export const useLogin = () => {
  return useMutation({
    mutationFn: async ({ email, password, rememberMe }) => {
      const response = await api.post("/login", { email, password });
      const { accessToken, refreshToken } = response.data;
      TokenService.setTokens(accessToken, refreshToken, rememberMe);
      return response.data;
    },
  });
};