import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../../services/apiCabins.js";

export const useCabins = () => {
  const { data: cabins, isLoading } = useQuery({
    queryKey: ["cabin"],
    queryFn: getCabins,
  });

  return { cabins, isLoading };
};
