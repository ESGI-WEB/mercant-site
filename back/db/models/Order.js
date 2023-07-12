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

    Order.belongsTo(User(connection), {
        foreignKey: {
            allowNull: false
        }
    });
    User(connection).hasMany(Order, {
        foreignKey: {
            allowNull: false
        }
    });
    Order.belongsToMany(Product(connection), {
        through: OrderDetails(connection),
        foreignKey: {
            allowNull: false
        }
    });
    Product(connection).belongsToMany(Order, {
        through: OrderDetails(connection),
        foreignKey: {
            allowNull: false
        }
    });

    return Order;
};