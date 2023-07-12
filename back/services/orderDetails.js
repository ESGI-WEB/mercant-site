const { Sequelize } = require("sequelize");
const { Order } = require("../db");
const { Product } = require("../db");
const { OrderDetails } = require("../db");
const ValidationError = require("../errors/ValidationError");

module.exports = {
  create: async function (orderId, productId, quantity) {
    try {
      const order = await Order.findByPk(orderId);
      if (!order) {
        throw new Error('Specified order does not exist.');
      }

      const product = await Product.findByPk(productId);
      if (!product) {
        throw new Error('Specified product does not exist.');
      }

      const orderDetails = {
        orderId: orderId,
        productId: productId,
        quantity: quantity,
      };

      return await OrderDetails.create(orderDetails);
    } catch (e) {
      if (e instanceof Sequelize.ValidationError) {
        throw ValidationError.createFromSequelizeValidationError(e);
      }
      throw e;
    }
  },
  remove: async function (criteria) {
    return OrderDetails.destroy({
      where: criteria,
    });
  },
};
