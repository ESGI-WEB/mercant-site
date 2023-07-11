const {Model, DataTypes} = require("sequelize");

module.exports = function (connection) {

    class OrderDetails extends Model {}

    OrderDetails.init({
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInteger: true,
                validate: {
                    notNull: {
                        msg: "Quantity cannot be null",
                    },
                },
            },
        },
        OrderId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'orders',
                key: 'id'
            }
        },
        ProductId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'products',
                key: 'id'
            }
        },
    }, {
        sequelize: connection,
        underscored: true,
        tableName: "order_details",
    });

    return OrderDetails;
}