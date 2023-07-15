const { Model, DataTypes } = require("sequelize");
const Order = require("./Order");

module.exports = (connection) => {
  class Refund extends Model {}

  Refund.init(
    {
      totalRefund: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'TotalRefund cannot be null.'
          }
        }
      },
      amountRefunded: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      status: {
        type: DataTypes.ENUM('In progress', 'Completed', 'Canceled'),
        defaultValue: 'In progress',
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Status cannot be null.'
          }
        }
      }
    },
    {
      underscored: true,
      sequelize: connection,
      tableName: "refunds"
    }
  );

  return Refund;
};
