module.exports = function (Service) {
  return {
    post: async (req, res, next) => {
      try {
        const orderId = req.params.id;
        const { ProductId, quantity, currency } = req.body;
        const order = Service.create(orderId, ProductId, quantity, currency)
        res.status(201).json(order);
      } catch (err) {
        next(err);
      }
    },
  };
};
