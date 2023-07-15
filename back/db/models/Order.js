const { Model, DataTypes } = require("sequelize");
const User = require("./User");
const Product = require("./Product")
const OrderDetails = require('./OrderDetails')

module.exports = function (connection) {
    class Order extends Model {}

    Order.init(
        {
            totalPrice: {
                type: DataTypes.FLOAT,
                defaultValue: 0
            },
            currency: {
                type: DataTypes.ENUM("Euros", "Dollar"),
                allowNull: false,
                defaultValue: 'Euros',
                validate: {
                    notNull: {
                        msg: "Currency cannot be null",
                    },
                },
            },
            status: {
                type: DataTypes.ENUM('Draft', 'Canceled', 'Refund in progress', 'Refunded', 'Refund cancelled'),
                defaultValue: 'Draft',
                allowNull: false
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