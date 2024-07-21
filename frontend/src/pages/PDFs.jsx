import PDFList from "../features/pdf/PDFList";
import UploadPDF from "../features/pdf/UploadPDF";
import FilterRow from "../components/FilterRow";
function PDFs() {
  return (
    <section className="h-full w-full">
      <div className="w-full">
        <FilterRow
          filterName="pdf"
          filterFields={[
            { key: "all", label: "All" },
            { key: "myPdfs", label: "My PDFs" },
            { key: "date-desc", label: "Date(Latest First)" },
            { key: "date-asc", label: "Date(Earliest First)" },
          ]}
        />
      </div>
      <div className="w-full">
        <PDFList />
      </div>
      <div className="mx-auto max-w-[800px] bg-blue-500 p-4">
        <UploadPDF />
      </div>
    </section>
  );
}

export default PDFs;
