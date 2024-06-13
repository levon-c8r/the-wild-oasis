import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { signup as signupFn } from "../../../services/apiAuth.js";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupFn,
    onSuccess: (user) => {
      toast.success(
        "Account successfully created! Please verify the new account from the user's email address."
      );
    },
  });

  return { signup, isLoading };
}
