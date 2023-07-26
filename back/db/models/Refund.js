const { Model, DataTypes } = require("sequelize");
const Order = require("./Order");

module.exports = (connection) => {
  class Refund extends Model {
    static statuses = ["In progress", "Completed", "Cancelled"];
  }

  Refund.init(
    {
      totalRefund: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
        validate: {
          notNull: {
            msg: "TotalRefund cannot be null.",
          },
        },
      },
      amountRefunded: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM(...Refund.statuses),
        defaultValue: "In progress",
        allowNull: false,
        validate: {
          isIn: function (value) {
            if (!Refund.statuses.includes(value)) {
              throw new Error(
                `Status must be one of ${Refund.statuses.join(", ")}`
              );
            }
          },
        },
      },
    },
    {
      sequelize: connection,
      tableName: "refunds",
    }
  );

  return Refund;
};
