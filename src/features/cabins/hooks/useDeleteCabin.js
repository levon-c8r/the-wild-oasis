import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as deleteFn } from "../../../services/apiCabins.js";

export const useDeleteCabin = () => {
  const queryClient = useQueryClient();

  const { isLoading, mutate: deleteCabin } = useMutation({
    mutationFn: deleteFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });

      toast.success("Cabin successfully deleted");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { deleteCabin, isLoading };
};
