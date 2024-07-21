import { MdFileUpload } from "react-icons/md";
import { FaFile } from "react-icons/fa";
import { useDropzone } from "react-dropzone";

function PDFDropzone({ onDrop, name, fileName }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "application/pdf",
  });

  return (
    <div
      {...getRootProps()}
      className="flex h-[200px] cursor-pointer flex-col items-center justify-center rounded-sm border-2 border-dashed p-5 text-center text-sm text-stone-500"
    >
      <input {...getInputProps()} name={name} />
      {isDragActive ? (
        <p>Drop the PDF here...</p>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-base">
            Drag & drop a PDF file here, or click to select one
          </p>
          {fileName && (
            <p className="flex items-center gap-2 bg-[#9b000049] p-2 text-black">
              <span>
                <FaFile />
              </span>
              <span>{fileName}</span>
            </p>
          )}
          <span className="rounded-full bg-red-400 p-4 text-lg text-white">
            <MdFileUpload />
          </span>
        </div>
      )}
    </div>
  );
}

export default PDFDropzone;
