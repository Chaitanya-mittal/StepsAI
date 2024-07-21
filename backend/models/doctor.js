const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Doctor = sequelize.define(
    "Doctor",
    {
      DoctorID: {
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
      Specialty: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "Doctors",
      timestamps: true,
    }
  );

  return Doctor;
};
