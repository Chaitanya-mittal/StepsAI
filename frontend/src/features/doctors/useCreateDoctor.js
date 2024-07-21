import { useMutation } from "@tanstack/react-query";
import { createDoctor } from "../../services/apiDoctors";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useCreateDoctor() {
  const navigate = useNavigate();
  const { mutate: createDoctorFunction, isPending: isCreating } = useMutation({
    mutationFn: createDoctor,
    onSuccess: () => {
      navigate("/app");
      toast.success("Account Created");
    },
    onError: (e) => {
      toast.error("Signup failed");
      navigate("/");
    },
  });
  return { createDoctorFunction, isCreating };
}

export default useCreateDoctor;
