import { useQueryClient, useMutation } from "@tanstack/react-query";
import { assignDoctor } from "../../services/apiPatientDoctor";
import toast from "react-hot-toast";
function useAssignDoctor() {
  const queryClient = useQueryClient();
  const { mutate: assignDoctorFunc, isPending: IsAssigning } = useMutation({
    mutationFn: assignDoctor,
    onSuccess: () => {
      toast.success("Patient Considered");
      queryClient.invalidateQueries({
        queryKey: ["patients"],
      });
    },
    onError: () => toast.error("Failed"),
  });
  return { assignDoctorFunc, IsAssigning };
}

export default useAssignDoctor;
