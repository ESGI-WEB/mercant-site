const { Sequelize } = require("sequelize");
const { Refund } = require("../db");
const ValidationError = require("../errors/ValidationError");

module.exports = {
  findAll: async function (criteria, options = {}) {
    return Refund.findAll({
      where: criteria,
      ...options,
      refund: Object.entries(options.refudn || {}),
    });
  },
  findById: async function (id) {
    return Refund.findByPk(id);
  },
  create: async function (data) {
    try {
      return await Refund.create(data);
    } catch (e) {
      if (e instanceof Sequelize.ValidationError) {
        throw ValidationError.createFromSequelizeValidationError(e);
      }
      throw e;
    }
  },
  remove: async function (criteria) {
    return Refund.destroy({
      where: criteria,
    });
  },
};
