const express = require("express");
const router = express.Router();
const { Patient, DoctorPatient, Doctor } = require("../models/model");
const { getHashedPassword } = require("../helpers/bcrypt");
// GET all patients
router.get("/", async (req, res) => {
  try {
    const patients = await Patient.findAll();
    const modiPatients = await Promise.all(
      patients.map(async (patient) => {
        console.log(patient);
        const result = await DoctorPatient.findOne({
          where: { PatientID: patient.PatientID },
          include: {
            model: Doctor,
            attributes: ["DoctorID", "Name", "Email", "Specialty"], // specify the attributes you want
          },
        });

        return result
          ? { ...patient.toJSON(), doctor: result.Doctor }
          : patient.toJSON();
      })
    );
    // console.log(newP);
    res.status(201).json({ patients: modiPatients, success: true });
  } catch (error) {
    res.status(500).json({ error: "Server Issue", success: false });
  }
});

// GET a single patient by ID
router.get("/:id", async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (patient) {
      res.json(patient);
    } else {
      res.status(404).json({ message: "Patient not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server Issue" });
  }
});

// POST a new patient
router.post("/", async (req, res) => {
  try {
    const hashed = await getHashedPassword(req.body.PasswordHash);

    const patient = await Patient.create({ ...req.body, PasswordHash: hashed });
    res.status(201).json({ patient, success: true });
  } catch (error) {
    res.status(400).json({ error: "Server Issue", success: false });
  }
});

module.exports = router;
