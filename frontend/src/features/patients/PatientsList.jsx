import usePatients from "./usePatients";
import PatientRow from "./PatientRow";
import Table from "../../components/Table";
import Loader from "../../components/Loader";
import Empty from "../../components/Empty";
import { useSearchParams } from "react-router-dom";
import { useAuthContext } from "../../context/AuthProvider";
function PatientsList() {
  const { patients = [], isLoading } = usePatients();
  const { currDoctor } = useAuthContext();
  const [searchParams] = useSearchParams();
  const currFilter = searchParams.get("doctor") || "all";
  let filteredData;
  if (currFilter === "all") {
    filteredData = patients;
  }
  if (currFilter === "assigned") {
    filteredData = patients.filter((patient) => patient.doctor);
  }
  if (currFilter === "not-assigned") {
    filteredData = patients.filter((patient) => !patient.doctor);
  }
  if (currFilter === "myPatients") {
    filteredData = patients.filter(
      (patient) =>
        patient.doctor && patient.doctor.DoctorID === currDoctor.DoctorID,
    );
  }

  if (isLoading) return <Loader />;
  return (
    <section className="mx-auto flex h-full w-full max-w-[800px] flex-col justify-center">
      {filteredData.length === 0 ? (
        <Empty resource="Patients" />
      ) : (
        <Table
          columns="0.5fr_1fr_1fr_0.5fr"
          headers={["Id", "Patient", "Doctor", ""]}
          data={filteredData}
          render={(patient) => (
            <PatientRow key={patient.PatientID} patient={patient} />
          )}
        ></Table>
      )}
    </section>
  );
}

export default PatientsList;
