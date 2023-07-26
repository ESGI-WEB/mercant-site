const { Sequelize } = require("sequelize");
const { Order } = require("../db");
const ValidationError = require("../errors/ValidationError");

module.exports = {
  findAll: async function (criteria, options = {}) {
    return Order.findAll({
      where: criteria,
      ...options,
      order: Object.entries(options.order || {}),
    });
  },
  findById: async function (id) {
    return Order.findByPk(id);
  },
  findOrCreate: async function (criteria, defaults) {
    return Order.findOrCreate({
      where: criteria,
      defaults,
    });
  },
  create: async function (data) {
    try {
      return await Order.create(data);
    } catch (e) {
      if (e instanceof Sequelize.ValidationError) {
        throw ValidationError.createFromSequelizeValidationError(e);
      }
      throw e;
    }
  },
  update: async function (criteria, data) {
    try {
      const [nb, orders = []] = await Order.update(data, {
        where: criteria,
        returning: true,
        individualHooks: true,
      });
      return orders;
    } catch (e) {
      if (e instanceof Sequelize.ValidationError) {
        throw ValidationError.createFromSequelizeValidationError(e);
      }
      throw e;
    }
  },
  remove: async function (criteria) {
    return Order.destroy({
      where: criteria,
    });
  },
  async format(datas) {
    return Array.isArray(datas)
      ? await Promise.all(datas.map((data) => data.format()))
      : datas.format();
  }
};
