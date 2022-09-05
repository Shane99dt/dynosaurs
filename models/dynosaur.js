const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  const Dynosaur = sequelize.define("Dynosaur", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    scientificName: {
      type: DataTypes.STRING
    },
    yearOfAppearance: {
      type: DataTypes.INTEGER
    },
    yearOfDisappearance: {
      type: DataTypes.INTEGER
    },
    description: {
      type: DataTypes.TEXT
    },
    color: {
      type: DataTypes.STRING
    }
  })
  return Dynosaur
}