const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const DoctorPatient = sequelize.define(
    "DoctorPatient",
    {
      ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      DoctorID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Doctors",
          key: "DoctorID",
        },
      },
      PatientID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Patients",
          key: "PatientID",
        },
      },
    },
    {
      tableName: "DoctorPatients",
      timestamps: true,
    }
  );

  return DoctorPatient;
};
