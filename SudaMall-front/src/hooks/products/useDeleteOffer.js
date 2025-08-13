import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProductOffer } from '../../api/products/deleteProduct';
import { toast } from 'react-toastify';

export const useDeleteOffer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProductOffer,
    onSuccess: (_, { id }) => {
      // Invalidate or update cached products
      queryClient.invalidateQueries(['products']);
      toast.success("تم حذف العرض من المنتج")
    },
    onError: (error) => {
      console.error("Failed to delete product:", error);
      toast.error("فشل حذف العرض")
    },
  });
};
