// const express = require("express");
// const app = express();
// const {
//   sequelize,
//   Doctor,
//   PDF,
//   DoctorPatient,
//   Patient,
// } = require("./modals/model");
// const doctorRouter = require("./routes/doctor");

// app.use(express.json());
// app.use("/doctors/", doctorRouter);

// app.post("/doctors", async (req, res) => {
//   try {
//     const doctor = await Doctor.create(req.body);
//     res.status(201).json(doctor);
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// });

// app.post("/login", async (req, res) => {
//   try {
//   } catch (err) {}
// });

// app.post("/patients", async (req, res) => {
//   try {
//     const patient = await Patient.create(req.body);
//     res.status(201).json(patient);
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// });

// app.post("/pdfs", async (req, res) => {
//   try {
//     const pdf = await PDF.create(req.body);
//     res.status(201).json(pdf);
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// });

// app.post("/doctor-patient", async (req, res) => {
//   try {
//     console.log(req.body);

//     const doctorPatient = await DoctorPatient.create(req.body);
//     res.status(201).json(doctorPatient);
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// });

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Connection has been established successfully.");
//     return sequelize.sync({ alter: true }); // Sync models without recreating tables
//   })
//   .catch((err) => {
//     console.error("Unable to connect to the database:", err);
//   });

// app.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });

const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require("path");
const { sequelize } = require("./models/model");
const doctorRoutes = require("./routes/doctor");
const patientRoutes = require("./routes/patient");
const pdfRoutes = require("./routes/pdf");
const doctorPatientRoutes = require("./routes/doctorPatient");
const cors = require("cors");

const app = express();

// Middleware
app.use(
  cors({
    origin: "https://localhost:5173", // Your Vite development server URL
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

app.use(express.json());

// Use routers
app.use("/doctors", doctorRoutes);
app.use("/patients", patientRoutes);
app.use("/pdfs", pdfRoutes);
app.use("/doctorPatients", doctorPatientRoutes);

const port = process.env.PORT || 3000;

const options = {
  key: fs.readFileSync(path.join(__dirname, "server.key")),
  cert: fs.readFileSync(path.join(__dirname, "server.cert")),
};

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database & tables created/updated!");
    https.createServer(options, app).listen(port, () => {
      console.log(`Server is running on https://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Unable to create or update tables:", error);
  });
