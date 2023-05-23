const { DataTypes } = require("sequelize");

module.exports = sequelize => {
  sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING(100),
        unique: {
          args: true,
          msg: "Email address is already in use!",
        },
        validate: {
          isEmail: {
            msg: "Please provide a valid email",
          },
        },
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
