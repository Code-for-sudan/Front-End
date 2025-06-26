// src/hooks/useLogin.js
import { useMutation } from "@tanstack/react-query";

import { login } from "../api/Auth";

export const useLogin = () => {
  return useMutation({
    mutationFn: login
    })
  }


