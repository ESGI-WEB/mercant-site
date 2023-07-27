const { Model, DataTypes } = require("sequelize");

module.exports = function (connection) {
  class Order extends Model {
    static currencies = ["EUR", "USD", "CHF", "GBP"];
    static statuses = [
      "Draft",
      "Processing",
      "Paid",
      "Cancelled",
      "Refund in progress",
      "Refunded",
      "Refund cancelled",
    ];

    async getTotalPrice() {
      const orderDetails = (await this.getOrderDetails()) ?? [];
      console.log(orderDetails)

      let total = 0;
      for (const orderDetail of orderDetails) {
        const productPrice = (await orderDetail.getProduct()).price;
        console.log(productPrice)
        const quantity = orderDetail.quantity;
        total += productPrice * quantity;
      }

      return Number(total.toFixed(2));
    }

    async format() {
      return {
        ...this.dataValues,
        totalPrice: await this.getTotalPrice(),
      };
    }
  }

  Order.init(
    {
      currency: {
        type: DataTypes.ENUM(...Order.currencies),
        allowNull: false,
        defaultValue: "EUR",
        validate: {
          isIn: function (value) {
            if (!Order.currencies.includes(value)) {
              throw new Error(
                `Currency must be one of ${Order.currencies.join(", ")}`
              );
            }
          },
        },
      },
      status: {
        type: DataTypes.ENUM(...Order.statuses),
        defaultValue: "Draft",
        allowNull: false,
        validate: {
          isIn: function (value) {
            if (!Order.statuses.includes(value)) {
              throw new Error(
                `Status must be one of ${Order.statuses.join(", ")}`
              );
            }
          },
        },
      },
      refundId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      checkoutUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    },
    {
      sequelize: connection,
      tableName: "orders",
    }
  );

  return Order;
};
