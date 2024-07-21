import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginDoctor } from "../../services/apiDoctors";
function useLoginDoctor() {
  const navigate = useNavigate();
  const { mutate: loginFunction, isPending: logginIn } = useMutation({
    mutationFn: loginDoctor,
    onSuccess: (d) => {
      toast.success("Login successfull");
      navigate("/app");
    },
    onError: (err) => {
      console.log(err.message === "Invalid credentials");
      toast.error(
        err.message === "Invalid credentials"
          ? "Wrong Credentials"
          : "Login failed",
      );
      navigate("/");
    },
  });
  return { loginFunction, logginIn };
}

export default useLoginDoctor;
