const { Model, DataTypes } = require("sequelize");

module.exports = function (connection) {
  class OrderDetails extends Model {}

  OrderDetails.init(
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          notNull: {
            msg: "Quantity cannot be null",
          },
        },
      },
    },
    {
      sequelize: connection,
      tableName: "order_details",
    }
  );

  return OrderDetails;
};
