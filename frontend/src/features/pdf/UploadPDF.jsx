import Modal from "../../components/Modal";
import { FiUpload } from "react-icons/fi";

import DragnUpload from "./DragnUpload";

function UploadPDF() {
  return (
    <Modal>
      <Modal.Open opens="pdfForm">
        <div className="flex w-full items-center justify-center gap-2">
          <span>
            <FiUpload />
          </span>
          <span>Upload</span>
        </div>
      </Modal.Open>
      <Modal.Window name="pdfForm">
        <DragnUpload />
      </Modal.Window>
    </Modal>
  );
}

export default UploadPDF;
