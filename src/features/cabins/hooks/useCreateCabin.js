import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../../services/apiCabins.js";

export const useCreateCabin = () => {
  const queryClient = useQueryClient();

  const { isLoading: isCreateLoading, mutate: createCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("Cabin successfully created");
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createCabin, isCreateLoading };
};
