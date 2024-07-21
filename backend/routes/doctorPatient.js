const express = require("express");
const router = express.Router();
const { DoctorPatient, Doctor } = require("../models/model");

// POST a new doctor-patient relationship - assigning doctor
router.post("/", async (req, res) => {
  try {
    const doctorPatient = await DoctorPatient.create(req.body);
    res.status(201).json({ doctorPatient, success: true });
  } catch (error) {
    res.status(400).json({ error: error.message, success: false });
  }
});

//getting assigned doctor
router.get("/assignedDoctor/:PatientID", async (req, res) => {
  const { PatientID } = req.params;
  try {
    const result = await DoctorPatient.findOne({
      where: { PatientID: PatientID },
      include: {
        model: Doctor,
        attributes: ["DoctorID", "Name", "Email", "Specialty"], // specify the attributes you want
      },
    });

    if (result) {
      return res.status(201).json({ doctor: result.Doctor, success: true }); // Access the related Doctor model
    } else {
      return res.status(404).json({ error: "Not found", success: false });
    }
  } catch (error) {
    console.error("Error fetching doctor by patient ID:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
