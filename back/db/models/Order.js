const { Model, DataTypes } = require("sequelize");
const User = require("./User");
const Product = require("./Product")
const OrderDetails = require('./OrderDetails')

module.exports = function (connection) {
    class Order extends Model {
        static currencies = ["EUR", "USD", "CHF", "GBP"];
        static statuses = ["Draft", "Canceled", "Refund in progress", "Refunded", "Refund cancelled"];
    }

    Order.init(
        {
            totalPrice: {
                type: DataTypes.FLOAT,
                defaultValue: 0
            },
            currency: {
                type: DataTypes.ENUM(...Order.currencies),
                allowNull: false,
                defaultValue: 'EUR',
                validate: {
                    isIn: function (value) {
                        if (!Order.currencies.includes(value)) {
                            throw new Error(`Currency must be one of ${Order.currencies.join(", ")}`);
                        }
                    },
                }
            },
            status: {
                type: DataTypes.ENUM(...Order.statuses),
                defaultValue: 'Draft',
                allowNull: false,
                validate: {
                    isIn: function (value) {
                        if (!Order.statuses.includes(value)) {
                            throw new Error(`Status must be one of ${Order.statuses.join(", ")}`);
                        }
                    },
                }
            },
            refundId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'refunds',
                    key: 'id'
                },
                allowNull: true,
            },
        },
        {
            sequelize: connection,
            underscored: true,
            tableName: "orders",
        }
    );

    return Order;
};