import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking } from "../../../services/apiBookings.js";

export const useCheckOut = () => {
  const queryClient = useQueryClient();

  const { mutate: checkOut, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out `);
      queryClient.invalidateQueries({ active: true });
    },

    onError: (e) => {
      toast.error("There was error when checking out");
      console.error(e);
    },
  });

  return { checkOut, isCheckingOut };
};
