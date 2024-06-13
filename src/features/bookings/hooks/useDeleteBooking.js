import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteFn } from "../../../services/apiBookings.js";

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  const { isLoading, mutate: deleteBooking } = useMutation({
    mutationFn: deleteFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });

      toast.success("Booking successfully deleted");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { deleteBooking, isLoading };
};
