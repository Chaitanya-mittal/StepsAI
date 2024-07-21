const express = require("express");
const { Doctor } = require("../models/model");
const { getHashedPassword, checkPassword } = require("../helpers/bcrypt");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.findAll();
    res.status(201).json({ doctors, success: true });
  } catch (error) {
    res.status(500).json({ error: "Server issue", success: false });
  }
});

//creating new Doctor
router.post("/", async (req, res) => {
  try {
    const hashed = await getHashedPassword(req.body.PasswordHash);
    const doctor = await Doctor.create({ ...req.body, PasswordHash: hashed });
    res.status(201).json({ doctor, success: true });
  } catch (error) {
    res.status(500).json({ error: error.message, success: false });
  }
});

//login doctor
router.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    const doctor = await Doctor.findOne({
      where: {
        Email: req.body.email, // Replace with the desired email address
      },
    });
    if (!doctor) {
      return res
        .status(404)
        .json({ error: "Invalid credentials", success: false });
    }
    const isValid = await checkPassword({
      password: req.body.password,
      passwordHash: doctor.PasswordHash,
    });

    if (isValid) {
      return res.status(201).json({ doctor, success: true });
    } else {
      return res
        .status(404)
        .json({ error: "Invalid credentials", success: false });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message, success: false });
  }
});

// get specific doctor
router.get("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id);
    if (doctor) {
      res.status(201).json({ doctor, success: true });
    } else {
      res.status(404).json({ error: "Doctor not found", success: false });
    }
  } catch (error) {
    res.status(500).json({ error: error.message, success: false });
  }
});
module.exports = router;
