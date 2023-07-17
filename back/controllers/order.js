const GenericController = require("./genericCRUD");

module.exports = function (OrderService, OrderDetailsService, ProductService, RefundService) {
  const { cget, post, get, put, patch, delete: deleteMethod } = GenericController(OrderService);
  return {
    cget,
    post,
    get,
    put,
    patch,
    delete: deleteMethod,
    addProduct: async (req, res, next) => {
      try {
        const orderId = parseInt(req.params.id);
        const { ProductId, quantity } = req.body;

        if (isNaN(orderId) || isNaN(ProductId) || isNaN(quantity)) {
          return res.status(400).json({ error: "Invalid input" });
        }

        const orderDetails = await OrderDetailsService.create(orderId, ProductId, quantity);

        if (orderDetails) {
          const product = await ProductService.findById(ProductId);
          const addedPrice = product.price * quantity;
          const order = await OrderService.findById(orderId);
          await order.increment({ totalPrice: addedPrice });

          return res.status(201).json(orderDetails);
        } else {
          return res.status(404).json({ error: "Order not found" });
        }
      } catch (err) {
        next(err);
      }
    },
    removeProduct: async (req, res, next) => {
      try {
        const productId = parseInt(req.params.productId);
        const orderId = parseInt(req.params.id);

        if (isNaN(productId) || isNaN(orderId)) {
          return res.status(400).json({ error: "Invalid input" });
        }

        const [orderDetails] = await OrderDetailsService.findByOrderIdAndProductId(orderId, productId);
        const numberOfRemoved = await OrderDetailsService.remove({ productId });

        if (numberOfRemoved) {
          const product = await ProductService.findById(productId);
          const order = await OrderService.findById(orderId);
          const removedPrice = product.price * orderDetails.quantity;
          await order.decrement({ totalPrice: removedPrice });

          return res.sendStatus(204);
        } else {
          return res.sendStatus(404);
        }
      } catch (err) {
        next(err);
      }
    },
    getProducts: async (req, res, next) => {
      const {
        _page = 1,
        _itemsPerPage = 10,
        _sort = {},
        ...criteria
      } = req.query;
      try {
        const orderId = parseInt(req.params.id);

        if (isNaN(orderId)) {
          return res.status(400).json({ error: "Invalid input" });
        }

        const orderDetails = await OrderDetailsService.findByOrderId(orderId);
        const productIds = orderDetails.map(order => order.productId);
        const productPromises = productIds.map(productId => ProductService.findById(productId));
        const products = await Promise.all(productPromises);

        res.json(products);
      } catch (err) {
        next(err);
      }
    },
    getRefund: async (req, res, next) => {
      try {
        const orderId = parseInt(req.params.id);

        if (isNaN(orderId)) {
          return res.status(400).json({ error: "Invalid input" });
        }

        const order = await OrderService.findById(orderId);
        const refundId = order.refundId;
        const refund = await RefundService.findById(refundId);

        res.json(refund);
      } catch (err) {
        next(err);
      }
    },
    addRefund: async (req, res, next) => {
      try {
        const orderId = parseInt(req.params.id);

        if (isNaN(orderId)) {
          return res.status(400).json({ error: "Invalid input" });
        }

        const refundObject = {
          totalRefund: req.body.totalRefund,
          amountRefunded: req.body.amountRefunded,
          status: req.body.status,
        };

        const refund = await RefundService.create(refundObject);

        if (refund) {
          await OrderService.update(
            {
              id: orderId,
            },
            {
              refundId: refund.id,
            }
          );
          return res.status(201).json(refund);
        } else {
          return res.status(404).json({ error: "Refund not found" });
        }
      } catch (err) {
        next(err);
      }
    },
  };
};
