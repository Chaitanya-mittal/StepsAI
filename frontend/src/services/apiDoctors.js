export async function createDoctor(doctor) {
  try {
    console.log(doctor);
    const res = await fetch("/api/doctors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(doctor),
    });
    const responseData = await res.json();
    if (responseData.success) {
      return responseData.doctor;
    } else {
      throw new Error(responseData.error);
    }
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getDoctor(doctorId) {
  try {
    const res = await fetch(`/api/doctors/${doctorId}`);
    const responseData = await res.json();
    if (responseData.success) {
      return responseData.doctor;
    } else {
      throw new Error(responseData.error);
    }
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function loginDoctor(doctor) {
  try {
    const res = await fetch("/api/doctors/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(doctor),
    });
    const responseData = await res.json();
    if (responseData.success) {
      return responseData.doctor;
    } else {
      throw new Error(responseData.error);
    }
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getDoctors() {
  try {
    const res = await fetch("/api/doctors");
    const responseData = await res.json();
    if (responseData.success) {
      return responseData.doctors;
    } else {
      throw new Error(responseData.error);
    }
  } catch (err) {
    throw new Error(err.message);
  }
}
