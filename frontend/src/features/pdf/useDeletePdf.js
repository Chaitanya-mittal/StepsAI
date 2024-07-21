import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePDF } from "../../services/apiPdfs";
import toast from "react-hot-toast";
function useDeletePdf() {
  const queryClient = useQueryClient();
  const { mutate: deletePDFFunc, isPending: isDeleting } = useMutation({
    mutationFn: deletePDF,
    onSuccess: () => {
      toast.success("PDF Deleted");
      queryClient.invalidateQueries({
        queryKey: ["pdfs"],
      });
    },
    onError: () => {
      toast.error("Failed to delete Pdf");
    },
  });
  return { deletePDFFunc, isDeleting };
}

export default useDeletePdf;
