import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateFn } from "../../../services/apiSettings.js";

export const useUpdateSetting = () => {
  const queryClient = useQueryClient();

  const { isLoading: isUpdateLoading, mutate: updateSetting } = useMutation({
    mutationFn: updateFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
      toast.success("Setting successfully updated");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateSetting, isUpdateLoading };
};
