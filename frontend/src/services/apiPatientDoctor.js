export async function getAssignedDoctor(patientId) {
  try {
    const res = await fetch(`/api/doctorPatients/assignedDoctor/${patientId}`);
    const responseData = await res.json();
    if (responseData.success) {
      return responseData.doctor;
    } else {
      return null;
    }
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function assignDoctor({ PatientID, DoctorID }) {
  try {
    const res = await fetch("/api/doctorPatients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        DoctorID,
        PatientID,
      }),
    });
    const responseData = await res.json();

    if (responseData.success) {
      return responseData.doctorPatient;
    } else {
      console.log(responseData);
      throw new Error(responseData.error);
    }
  } catch (err) {
    throw new Error(err.message);
  }
}
