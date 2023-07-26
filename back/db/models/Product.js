const { Model, DataTypes } = require("sequelize");

module.exports = function (connection) {
  class Product extends Model {}

  Product.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 100],
          notNull: {
            msg: "Title cannot be null",
          },
          notEmpty: true,
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 400],
          notNull: {
            msg: "Description cannot be null",
          },
          notEmpty: true,
        },
      },
      image: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        isDecimal: {
          msg: "Price must be a valid decimal number",
        },
      },
    },
    {
      sequelize: connection,
      tableName: "products",
    }
  );

  return Product;
};
