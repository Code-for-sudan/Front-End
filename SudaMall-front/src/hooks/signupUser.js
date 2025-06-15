import { useMutation } from "@tanstack/react-query";
import { signupUser } from "../api/Auth";

export const useSignup = () => {
  return useMutation(signupUser);
};