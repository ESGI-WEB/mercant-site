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
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Price cannot be null",
                    },
                },
            },
        },
        {
            underscored: true,
            sequelize: connection,
            tableName: "orders",
        }
    );

    Order.belongsTo(User(connection));
    User(connection).hasMany(Order);
    Order.belongsToMany(Product(connection), { through: OrderDetails(connection) });
    Product(connection).belongsToMany(Order, { through: OrderDetails(connection) });

    return Order;
};