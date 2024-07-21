import Button from "../../components/Button";
import { useAuthContext } from "../../context/AuthProvider";
import useAssignDoctor from "./useAssignDoctor";

function PatientRow({ patient }) {
  const { currDoctor } = useAuthContext();
  const { assignDoctorFunc, isAssigning } = useAssignDoctor();

  function handleAssignDoctor() {
    assignDoctorFunc({
      DoctorID: currDoctor.DoctorID,
      PatientID: patient.PatientID,
    });
  }

  return (
    <li className="grid max-w-[1200px] grid-cols-[0.5fr_1fr_1fr_0.5fr] justify-center gap-4 border bg-white p-4">
      <div>{patient.PatientID}</div>
      <div className="flex flex-col">
        <span className="text-base">{patient.Name}</span>
        <span className="text-sm italic text-slate-600">{patient.Email}</span>
      </div>
      {patient?.doctor ? (
        <div className="flex flex-col">
          <span className="text-base text-red-500">{patient.doctor.Name}</span>
          <span className="text-sm italic text-slate-600">
            {patient.doctor.Specialty}
          </span>
        </div>
      ) : (
        <span>&mdash;</span>
      )}
      <div className="flex items-center justify-center text-sm">
        {!patient?.doctor ? (
          <Button type="doctor" size="small" onClick={handleAssignDoctor}>
            {isAssigning ? "Assigning...." : "Accept"}
          </Button>
        ) : (
          <span className="text-sm text-slate-600">Assigned</span>
        )}
      </div>
    </li>
  );
}

export default PatientRow;
