const { Router } = require("express");
const orderService = require("../services/order");

module.exports = function () {
  const router = Router();

  router.post("/", async (req, res, next) => {
    try {
      const orderId = req.payment.order_field;

      const status = req.paymentStatus === 'succeeded' ? 'Paid' : 'Cancelled';

      const [order] = await orderService.update({id: orderId}, {status});

      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  });

  return router;
};
