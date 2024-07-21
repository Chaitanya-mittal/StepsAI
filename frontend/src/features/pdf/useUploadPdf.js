import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { storePdf } from "../../services/apiPdfs";
function useUploadPdf() {
  const queryClient = useQueryClient();
  const { mutate: uploadPdfFunc, isPending: isUploading } = useMutation({
    mutationFn: storePdf,
    onSuccess: () => {
      toast.success("PDF Uploaded successfully");
      queryClient.invalidateQueries({
        queryKey: ["pdfs"],
      });
    },
    onError: (e) => {
      console.log(e);
      toast.error("Failed to upload pdf");
    },
  });
  return { uploadPdfFunc, isUploading };
}

export default useUploadPdf;
