// const { Sequelize, DataTypes } = require("sequelize");

// const sequelize = new Sequelize("StepsAi", "postgres", "4003", {
//   host: "localhost",
//   dialect: "postgres",
// });

// const Doctor = sequelize.define("Doctor", {
//   DoctorID: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   Name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   Email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   PasswordHash: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   Specialty: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// });

// const Patient = sequelize.define("Patient", {
//   PatientID: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   Name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   Email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   PasswordHash: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// });

// const PDF = sequelize.define("PDF", {
//   PDFID: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   DoctorID: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: Doctor,
//       key: "DoctorID",
//     },
//   },
//   FilePath: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   UploadDate: {
//     type: DataTypes.DATE,
//     allowNull: false,
//   },
// });

// const DoctorPatient = sequelize.define("DoctorPatient", {
//   ID: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   DoctorID: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: Doctor,
//       key: "DoctorID",
//     },
//   },
//   PatientID: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: Patient,
//       key: "PatientID",
//     },
//   },
// });

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("StepsAi", "postgres", "4003", {
  host: "localhost",
  dialect: "postgres",
});

// Initialize models
const Doctor = require("./doctor")(sequelize);
const Patient = require("./patients")(sequelize);
const PDF = require("./pdfs")(sequelize);
const DoctorPatient = require("./doctorPatient")(sequelize);

// // Define associations
// Doctor.belongsToMany(Patient, { through: DoctorPatient });
// Patient.belongsToMany(Doctor, { through: DoctorPatient });

// DoctorPatient.belongsTo(Doctor, {
//   foreignKey: "DoctorID",
// });

// DoctorPatient.belongsTo(Patient, {
//   foreignKey: "PatientID",
// });
Doctor.hasMany(DoctorPatient, { foreignKey: "DoctorID" });
Patient.belongsTo(Doctor, { through: DoctorPatient, foreignKey: "PatientID" });

DoctorPatient.belongsTo(Doctor, { foreignKey: "DoctorID" });
DoctorPatient.belongsTo(Patient, { foreignKey: "PatientID" });

// Export models and sequelize instance
module.exports = { sequelize, Doctor, Patient, PDF, DoctorPatient };

// module.exports = {
//   sequelize,
//   Doctor,
//   PDF,
//   DoctorPatient,
//   Patient,
// };
