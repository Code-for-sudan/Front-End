import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProductSize } from "../api/products/deleteProduct"; 

/**
 * Custom hook for deleting a product size using React Query
 */
export const useDeleteProductSize = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ ProductId, SizeId }) => deleteProductSize({ ProductId, SizeId }),

    // Optimistically update cache if needed
    onSuccess: (_, { ProductId }) => {
      // Invalidate and refetch the product details
      queryClient.invalidateQueries(["product", ProductId]);
    },

    onError: (error) => {
      console.error("Failed to delete product size:", error);
    },
  });
};
