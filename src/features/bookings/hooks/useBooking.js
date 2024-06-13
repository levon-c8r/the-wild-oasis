import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../../services/apiBookings.js";

export const useBooking = (id) => {
  const { data: booking, isLoading } = useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBooking(id),
    retry: false,
  });

  return { booking, isLoading };
};
