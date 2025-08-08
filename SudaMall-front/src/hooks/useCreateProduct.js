import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct } from '../api/products.js';
import { toast } from "react-toastify";
import { closeAddProduct } from '../app/AppStats.js';
import { useDispatch } from 'react-redux';

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: (res) => {
      console.log("response", res)
      toast.success('تم إنشاء المنتج بنجاح');
      dispatch(closeAddProduct());
      queryClient.invalidateQueries(['products']);
    },
    onError: (error) => {
      toast.error('فشل في إنشاء المنتج');
      console.log(error);
    },
  });
};
