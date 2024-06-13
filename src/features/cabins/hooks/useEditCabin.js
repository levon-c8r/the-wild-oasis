import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../../services/apiCabins.js";

export const useEditCabin = () => {
  const queryClient = useQueryClient();

  const { isLoading: isEditLoading, mutate: editCabin } = useMutation({
    mutationFn: ({ newCabinData, id }) =>
      createEditCabin(newCabinData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
      toast.success("Cabin successfully updated");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { editCabin, isEditLoading };
};
