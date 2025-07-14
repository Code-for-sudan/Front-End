import { useMutation } from "@tanstack/react-query";
import { signupUser , registerBusiness } from "../api/Auth";

export const useSignupUser = () => {
  return useMutation(signupUser);
};

export const useSignupBusiness = () => {
  return useMutation(registerBusiness);
};