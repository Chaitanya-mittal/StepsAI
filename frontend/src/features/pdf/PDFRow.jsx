import { formatDate } from "../../utils/date";
import Button from "../../components/Button";
import { CiLink } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import Modal from "../../components/Modal";
import ConfirmDelete from "../../components/ConfirmDelete";
import { useAuthContext } from "../../context/AuthProvider";

function PDFRow({ pdf }) {
  const { date: uploadDate = "", time: uploadTime = "" } = formatDate(
    pdf.UploadDate,
  );

  const { currDoctor } = useAuthContext();

  return (
    <li className="justofy-center grid max-w-[1200px] grid-cols-[0.5fr_1fr_1fr_0.5fr] justify-center gap-4 border bg-white p-4">
      <div>{pdf.PDFID}</div>
      <div className="flex flex-col text-sm font-medium">
        <span>{uploadDate}</span>
        <span className="italic text-stone-500">{uploadTime}</span>
      </div>
      {pdf?.doctor ? (
        <div className="flex flex-col">
          <span className="text-base text-red-500">{pdf.doctor.Name}</span>
          <span className="text-sm italic text-slate-600">
            {pdf.doctor.Specialty}
          </span>
        </div>
      ) : (
        <span>&mdash;</span>
      )}

      <div className="flex items-center gap-4">
        <a
          href={pdf.FilePath}
          target="_blank"
          className="text-2xl transition-all duration-100 hover:text-stone-500"
        >
          <CiLink />
        </a>
        {pdf.DoctorID === currDoctor.DoctorID && (
          <Modal>
            <Modal.Open opens="confirmDelete">
              <button className="text-lg transition-all duration-100 hover:text-stone-500">
                <RiDeleteBin5Line />
              </button>
            </Modal.Open>
            <Modal.Window name="confirmDelete">
              <ConfirmDelete pdfId={pdf.PDFID} />
            </Modal.Window>
          </Modal>
        )}
      </div>
    </li>
  );
}

export default PDFRow;
