const { Sequelize } = require("sequelize");
const { User, OrderDetails} = require("../db");
const ValidationError = require("../errors/ValidationError");
const e = require("express");

module.exports = {
  findAll: async function (criteria, options = {}) {
    return User.findAll({
      where: criteria,
      ...options,
      order: Object.entries(options.order || {}),
    });
  },
  findById: async function (id) {
    return User.findByPk(id);
  },
  findByEmail: async function (email) {
    return User.findOne({
      where: {
        email,
      }
    });
  },
  create: async function (data) {
    try {
      return await User.create(data);
    } catch (e) {
      if (e instanceof Sequelize.ValidationError) {
        throw ValidationError.createFromSequelizeValidationError(e);
      }
      throw e;
    }
  },
  update: async function (criteria, data) {
    try {
      const [nb, users = []] = await User.update(data, {
        where: criteria,
        returning: true,
        individualHooks: true,
      });
      return users;
    } catch (e) {
      if (e instanceof Sequelize.ValidationError) {
        throw ValidationError.createFromSequelizeValidationError(e);
      }
      throw e;
    }
  },
  remove: async function (criteria) {
    return User.destroy({
      where: criteria,
    });
  },
};
