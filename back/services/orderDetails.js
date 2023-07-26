const { Sequelize } = require("sequelize");
const { Order, Product, OrderDetails, User} = require("../db");
const ValidationError = require("../errors/ValidationError");

module.exports = {
  findAll: async function (criteria, options = {}) {
    return OrderDetails.findAll({
      where: criteria,
      ...options,
      order: Object.entries(options.order || {}),
    });
  },
  findById: async function (id) {
    return OrderDetails.findByPk(id);
  },
  findByOrderIdAndProductId: async function (orderId, productId) {
    return OrderDetails.findAll({
      where: {
        OrderId: orderId,
        ProductId: productId,
      },
    });
  },
  findByOrderId: async function (orderId) {
    return OrderDetails.findAll({
      where: {
        OrderId: orderId,
      },
    });
  },
  create: async function (orderId, productId, quantity) {
    try {
      const order = await Order.findByPk(orderId);
      if (!order) {
        throw new Error("Specified order does not exist.");
      }

      const product = await Product.findByPk(productId);
      if (!product) {
        throw new Error("Specified product does not exist.");
      }

      const orderDetails = {
        OrderId: orderId,
        ProductId: productId,
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
  update: async function (criteria, data) {
    try {
      const [nb, ordersDetails = []] = await OrderDetails.update(data, {
        where: criteria,
        returning: true,
        individualHooks: true,
      });
      return ordersDetails;
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
