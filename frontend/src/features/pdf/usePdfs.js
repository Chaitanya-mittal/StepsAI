import { useQuery } from "@tanstack/react-query";
import { getPdfs } from "../../services/apiPdfs";
function usePdfs() {
  const { data: pdfsData, isPending: loadingPdfs } = useQuery({
    queryKey: ["pdfs"],
    queryFn: getPdfs,
  });
  return { pdfsData, loadingPdfs };
}

export default usePdfs;
