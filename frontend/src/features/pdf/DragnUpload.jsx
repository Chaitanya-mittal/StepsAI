import { useForm, Controller } from "react-hook-form";
import PDFDropzone from "./PDFDropzone";
import Button from "../../components/Button";
import { useState } from "react";
import { useAuthContext } from "../../context/AuthProvider";
import useUploadPdf from "./useUploadPdf";

function DragnUpload({ closeModal }) {
  const { handleSubmit, control, setValue } = useForm();
  const [fileName, setFileName] = useState("");
  const { currDoctor } = useAuthContext();

  const { uploadPdfFunc, isUploading } = useUploadPdf();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    uploadPdfFunc(
      { doctorID: currDoctor.DoctorID, pdf: data },
      {
        onSuccess: () => closeModal(),
        onError: () => closeModal(),
      },
    );
  };

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && file.type === "application/pdf") {
      setValue("pdfFile", file);
      setFileName(file.name);
    } else {
      console.error("File is not a PDF:", file);
    }
  };

  return (
    <div className="min-w-[30rem] p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Controller
          name="pdfFile"
          control={control}
          defaultValue={null}
          render={({ field }) => (
            <PDFDropzone
              onDrop={handleDrop}
              name={field.name}
              fileName={fileName}
            />
          )}
        />
        <Button purpose="submit" type="patient" disabled={isUploading}>
          {isUploading ? "Uploading..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}

export default DragnUpload;
