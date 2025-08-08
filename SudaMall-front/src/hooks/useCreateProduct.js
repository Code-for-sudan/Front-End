import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../api/products/createProducts.js";
import { toast } from "react-toastify";
import { closeAddProduct } from "../app/AppStats.js";
import { useDispatch } from "react-redux";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success("تم إنشاء المنتج بنجاح");
      dispatch(closeAddProduct());
      queryClient.invalidateQueries(["products"]);
    },
    onError: () => {
      toast.error("فشل في إنشاء المنتج");
    },
  });

  return mutation;
};
