import { useQuery } from "@tanstack/react-query";
import { getPdfs } from "../../services/apiPdfs";
import Loader from "../../components/Loader";
import PDFRow from "./PDFRow";
import Table from "../../components/Table";
import usePdfs from "./usePdfs";
import Empty from "../../components/Empty";
import { useSearchParams } from "react-router-dom";
import { useAuthContext } from "../../context/AuthProvider";
import { compareIsoDates } from "../../utils/helpers";

function PDFList() {
  const { currDoctor } = useAuthContext();
  const { pdfsData = [], loadingPdfs } = usePdfs();
  const [searchParams] = useSearchParams();
  const currFilter = searchParams.get("pdf") || "all";
  let filterdData;
  if (currFilter === "all") {
    filterdData = pdfsData;
  }
  if (currFilter === "myPdfs") {
    filterdData = pdfsData.filter(
      (pdf) => pdf.doctor && pdf.doctor.DoctorID === currDoctor.DoctorID,
    );
  } else {
    const direction = currFilter.split("-")[1];
    const modifier = direction === "asc" ? 1 : -1;
    filterdData = pdfsData.sort(
      (a, b) => compareIsoDates(a.UploadDate, b.UploadDate) * modifier,
    );
  }

  if (loadingPdfs) return <Loader />;
  return (
    <section className="mx-auto flex h-full w-full max-w-[800px] flex-col justify-center">
      {filterdData.length === 0 ? (
        <Empty resource="PDFs" />
      ) : (
        <Table
          columns="0.5fr_1fr_1fr_0.5fr"
          headers={["Id", "Date", "Uploaded By", "Link"]}
          data={filterdData}
          render={(pdf) => <PDFRow key={pdf.PDFID} pdf={pdf} />}
        ></Table>
      )}
    </section>
  );
}

export default PDFList;
