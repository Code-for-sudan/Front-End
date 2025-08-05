import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProduct } from '../api/products/updateProduct.js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: updateProduct,
    onSuccess: (res) => {
      toast.success('تم تحديث المنتج بنجاح');
      queryClient.invalidateQueries(['products']);
      navigate(-1);
      console.log(res)
    },
    onError: (error) => {
      toast.error('فشل في تحديث المنتج');
      console.error(error);
    },
  });
};
