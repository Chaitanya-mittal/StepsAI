const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const PDF = sequelize.define(
    "PDF",
    {
      PDFID: {
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
      FilePath: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      UploadDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "PDFs",
      timestamps: true,
    }
  );

  return PDF;
};
