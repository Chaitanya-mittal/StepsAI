export async function getPatients() {
  try {
    const res = await fetch("/api/patients");
    const responseData = await res.json();
    if (responseData.success) {
      return responseData.patients;
    } else {
      throw new Error(responseData.error);
    }
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function createPatient(patient) {
  try {
    const res = await fetch("/api/patients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patient),
    });
    const responseData = await res.json();
    if (responseData.success) {
      return responseData.patient;
    } else {
      console.log(responseData.error);
      throw new Error(responseData.error);
    }
  } catch (err) {
    throw new Error(err.message);
  }
}
