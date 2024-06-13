import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "../../../services/apiBookings.js";

export const useCheckIn = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkIn, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in `);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },

    onError: (e) => {
      toast.error("There was error when checking in");
      console.error(e);
    },
  });

  return { checkIn, isCheckingIn };
};
