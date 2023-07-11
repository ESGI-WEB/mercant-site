const {Model, DataTypes} = require("sequelize");

module.exports = function (connection) {

    class OrderDetails extends Model {}

    OrderDetails.init({
        currency: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                validate: {
                    notNull: {
                        msg: "Currency cannot be null",
                    },
                },
            },
        },
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
        order_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'orders',
                key: 'id'
            }
        },
        product_id: {
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