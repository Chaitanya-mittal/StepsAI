import PatientsList from "../features/patients/PatientsList";
import Modal from "../components/Modal";
import CreatePatient from "../features/patients/CreatePatient";
import FilterRow from "../components/FilterRow";
function Patients() {
  return (
    <section className="h-full w-full">
      <div className="w-full">
        <FilterRow
          filterName="doctor"
          filterFields={[
            { key: "all", label: "All" },
            { key: "assigned", label: "Assigned" },
            { key: "not-assigned", label: "Not Assigned" },
            { key: "myPatients", label: "My Patients" },
          ]}
        />
      </div>
      <div className="w-full">
        <PatientsList />
      </div>
      <div className="mx-auto max-w-[800px]">
        <Modal>
          <Modal.Open opens="createPatient">
            <button className="w-full bg-blue-700 py-4 font-mono text-sm text-white transition-all duration-100 hover:bg-blue-600">
              Add Patient
            </button>
          </Modal.Open>
          <Modal.Window name="createPatient">
            <CreatePatient />
          </Modal.Window>
        </Modal>
      </div>
    </section>
  );
}

export default Patients;
