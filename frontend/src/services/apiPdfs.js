import supabase from "../utils/supabase";

export async function storePdf({ pdf, doctorID }) {
  const { pdfFile } = pdf;
  const pdfName = Math.random() + pdfFile.name.split(" ").join("_");
  const fileUrl = import.meta.env.VITE_BUCKET_URL + pdfName;

  //1. upload to storage

  const { data, error: storageError } = await supabase.storage
    .from("pdfBucket")
    .upload(pdfName, pdfFile);

  if (storageError) {
    console.log(storageError);
    throw new Error("unable to store pdf");
  }

  try {
    const res = await fetch("/api/pdfs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ FilePath: fileUrl, DoctorID: doctorID }),
    });
    const responseData = await res.json();
    if (responseData.success) {
      return responseData.pdf;
    } else {
      throw new Error(responseData.error);
    }
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getPdfs() {
  try {
    const res = await fetch("/api/pdfs");
    const responseData = await res.json();
    if (responseData.success) {
      return responseData.pdfs;
    } else {
      throw new Error(responseData.error);
    }
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function deletePDF(pdfId) {
  try {
    const res = await fetch(`/api/pdfs/${pdfId}`, { method: "DELETE" });
    const responseData = await res.json();
    if (responseData.success) {
      return;
    } else {
      console.log(responseData.error);
      throw new Error(responseData.error);
    }
  } catch (err) {
    throw new Error(err.message);
  }
}
