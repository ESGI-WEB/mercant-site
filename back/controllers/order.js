module.exports = function (Service) {
  return {
    post: async (req, res, next) => {
      try {
        const orderId = req.params.id;
        const { ProductId, quantity } = req.body;
        const order = Service.create(orderId, ProductId, quantity)
        res.status(201).json(order);
      } catch (err) {
        next(err);
      }
    },
  };
};
