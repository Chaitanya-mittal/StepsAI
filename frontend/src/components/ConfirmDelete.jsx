import Button from "./Button";
import useDeletePdf from "../features/pdf/useDeletePdf";

function ConfirmDelete({ closeModal, pdfId }) {
  const { deletePDFFunc, isDeleting } = useDeletePdf();
  function handleDeletePdf() {
    deletePDFFunc(pdfId, {
      onSuccess: closeModal,
      onError: closeModal,
    });
  }
  return (
    <div className="flex max-w-[400px] flex-col items-center gap-2 p-4">
      <h1 className="text-xl font-semibold">Confirmation</h1>
      <p className="mb-4 text-center text-stone-500">
        Are you sure you want to delete this pdf. Once deleted cannot be
        recovered.
      </p>
      <div className="flex items-center justify-center gap-4">
        <Button type="doctor" onClick={handleDeletePdf}>
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
        <Button type="cancel" onClick={closeModal}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
