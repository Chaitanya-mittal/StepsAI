const express = require("express");
const router = express.Router();
const { PDF, Doctor } = require("../models/model");

// GET all PDFs
router.get("/", async (req, res) => {
  try {
    const pdfs = await PDF.findAll();
    const newP = await Promise.all(
      pdfs.map(async (pdf) => {
        const result = await Doctor.findOne({
          where: { DoctorID: pdf.DoctorID },
          attributes: ["DoctorID", "Name", "Email", "Specialty"],
        });
        return result
          ? { ...pdf.toJSON(), doctor: result.toJSON() }
          : pdf.toJSON();
      })
    );

    res.status(201).json({ pdfs: newP, success: true });
  } catch (error) {
    res.status(500).json({ error: "Server Issue", success: false });
  }
});

// POST a new PDF
router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const pdf = await PDF.create(req.body);
    res.status(201).json({ pdf, success: true });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Server Issue", success: false });
  }
});

// DELETE a PDF
router.delete("/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const deleted = await PDF.destroy({
      where: { PDFID: req.params.id },
    });
    if (deleted) {
      res.status(201).json({ success: true });
    } else {
      res.status(404).json({ error: "PDF not found", success: false });
    }
  } catch (error) {
    res.status(500).json({ error: "Server Issue", success: false });
  }
});

module.exports = router;
