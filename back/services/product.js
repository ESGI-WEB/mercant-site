const { Sequelize } = require("sequelize");
const { Product } = require("../db");
const ValidationError = require("../errors/ValidationError");
const { Op } = require("sequelize")

module.exports = {
  findAll: async function (criteria, options = {}) {
    const { priceMin, priceMax, ...restCriteria } = criteria;
    const filter = {
      ...restCriteria,
    };

    if (priceMin != null) {
      filter.price = {
        ...(filter.price || {}),
        [Op.gte]: priceMin,
      };
    }
    if (priceMax != null) {
      filter.price = {
        ...(filter.price || {}),
        [Op.lte]: priceMax,
      };
    }
    return Product.findAll({
      where: filter,
      ...options,
      order: Object.entries(options.order || {}),
    });
  },
  findById: async function (id) {
    return Product.findByPk(id);
  },
  create: async function (data) {
    try {
      return await Product.create(data);
    } catch (e) {
      if (e instanceof Sequelize.ValidationError) {
        throw ValidationError.createFromSequelizeValidationError(e);
      }
      throw e;
    }
  },
  update: async function (criteria, data) {
    try {
      const [nb, products = []] = await Product.update(data, {
        where: criteria,
        returning: true,
        individualHooks: true,
      });
      return products;
    } catch (e) {
      if (e instanceof Sequelize.ValidationError) {
        throw ValidationError.createFromSequelizeValidationError(e);
      }
      throw e;
    }
  },
  remove: async function (criteria) {
    return Product.destroy({
      where: criteria,
    });
  },
};
