import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { login as loginFn } from "../../../services/apiAuth.js";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: loginFn,

    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      toast.success("you are successfully logged in");
      navigate("/", { replace: true });
    },

    onError: (e) => {
      console.error(e);
      toast.error("Something is wrong with your authentication data");
    },
  });

  return { login, isLoading };
};
