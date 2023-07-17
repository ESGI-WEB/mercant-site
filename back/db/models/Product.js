const { Model, DataTypes } = require("sequelize");

module.exports = function (connection) {
  class Product extends Model {}

  Product.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          max: 100,
          notNull: {
            msg: "Title cannot be null",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          max: 400,
          notNull: {
            msg: "Description cannot be null",
          },
        },
      },
      image: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          isFloat: true,
          notNull: {
            msg: "Price cannot be null",
          },
        },
      },
    },
    {
      underscored: true,
      sequelize: connection,
      tableName: "products",
    }
  );

  return Product;
};
