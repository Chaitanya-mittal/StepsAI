import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createPatient } from "../../services/apiPatients";
import toast from "react-hot-toast";
function useCreatePatient() {
  const queryClient = useQueryClient();
  const { mutate: createPatientFunction, isPending: isCreating } = useMutation({
    mutationFn: createPatient,
    onSuccess: () => {
      toast.success("Record Created");
      queryClient.invalidateQueries({
        queryKey: ["patients"],
      });
    },
    onError: (e) => {
      console.log(e);
      toast.error("Operation Failed");
    },
  });
  return { createPatientFunction, isCreating };
}

export default useCreatePatient;
