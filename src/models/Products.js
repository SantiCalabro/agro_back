const { DataTypes } = require("sequelize");

module.exports = sequelize => {
  sequelize.define(
    "products",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      principle: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      category: {
        type: DataTypes.ENUM(
          "agroquimicos",
          "semillas",
          "alimentos",
          "agroalimentos"
        ),
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM(
          "herbicida",
          "insecticida",
          "fungicida",
          "coadyuvante",
          "semilla",
          "alimento",
          "agroalimento"
        ),
        allowNull: false,
      },
      presentation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      crop: {
        type: DataTypes.STRING(1500),
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
};
