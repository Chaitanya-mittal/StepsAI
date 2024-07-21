const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Patient = sequelize.define(
    "Patient",
    {
      PatientID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      PasswordHash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "Patients",
      timestamps: true,
    }
  );

  return Patient;
};
