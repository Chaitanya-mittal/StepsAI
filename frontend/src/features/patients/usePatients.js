import { useQuery } from "@tanstack/react-query";
import { getPatients } from "../../services/apiPatients";
function usePatients() {
  const { data: patients, isPending: isLoading } = useQuery({
    queryKey: ["patients"],
    queryFn: getPatients,
  });
  return { patients, isLoading };
}

export default usePatients;
