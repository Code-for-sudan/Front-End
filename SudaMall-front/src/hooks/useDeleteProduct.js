import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProduct } from '../api/products/deleteProduct';
import { toast } from 'react-toastify';

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: (_, { id }) => {
      // Invalidate or update cached products
      queryClient.invalidateQueries(['products']);
      toast.success("تم حذف المنتج بنجاح")
    },
    onError: (error) => {
      console.error("Failed to delete product:", error);
      toast.error("فشل حذف المنتج")
    },
  });
};
