const GenericController = require("./genericCRUD");
const {Op} = require("sequelize");

module.exports = function (OrderService, OrderDetailsService, ProductService, RefundService, PaylessService) {
  const { cget, post, get, put, patch, delete: deleteMethod } = GenericController(OrderService);
  return {
    cget,
    post,
    get,
    put,
    patch,
    delete: deleteMethod,
    findOrCreate: async (req, res, next) => {
      try {
        const criteria = {
          UserId: req.user.id,
          status: "Draft"
        };
        const [order, wasCreated] = await OrderService.findOrCreate(criteria, {
          ...criteria,
          "currency": "EUR",
          "status": "Draft"
        });

        res.status(wasCreated ? 201 : 200).json(await order.format());
      } catch (error) {
        console.log(error)
        next(error)
      }
    },
    addProduct: async (req, res, next) => {
      try {
        const orderId = parseInt(req.params.id);
        const { ProductId, quantity } = req.body;

        if (isNaN(orderId) || isNaN(ProductId) || isNaN(quantity)) {
          return res.status(400).json({ error: "Invalid input" });
        }

        const orderDetails = await OrderDetailsService.create(orderId, ProductId, quantity);

        if (!orderDetails) {
          return res.status(404).json({ error: "Order not found" });
        }
        return res.status(200).json(orderDetails);
      } catch (err) {
        next(err);
      }
    },
    editProduct: async (req, res, next) => {
      try {
        const orderId = parseInt(req.params.id);
        const productId = parseInt(req.params.productId);
        const newQuantity = parseInt(req.body.quantity);

        if (isNaN(orderId) || isNaN(productId) || isNaN(newQuantity)) {
          return res.status(400).json({ error: "Invalid input" });
        }

        const orderDetails = await OrderDetailsService.findByOrderIdAndProductId(orderId, productId);

        if (!orderDetails || orderDetails.length === 0) {
          return res.status(404).json({ error: "Order details not found" });
        }

        const newOrderDetails = await OrderDetailsService.update(
          { id: orderDetails[0].id },
          { quantity: newQuantity });

        return res.status(200).json(newOrderDetails);
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

        const numberOfRemoved = await OrderDetailsService.remove({ ProductId: productId });

        if (!numberOfRemoved) {
          return res.sendStatus(404);
        }
        return res.sendStatus(204);
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

        const productsWithQuantity = [];
        for (const orderDetail of orderDetails) {
            const product = await orderDetail.getProduct();
            productsWithQuantity.push({...product.dataValues, quantity: orderDetail.quantity});
        }

        res.json(productsWithQuantity);
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
    checkout: async (req, res, next) => {
        try {
            // req.order is provide by the middleware, and it already checked for the order status
          let order = req.order;

          // call payment api
          const payment = await PaylessService.createPayment({
            total: await order.getTotalPrice(),
            currency: order.currency,
            client_field: order.UserId,
            order_field: order.id,
          });

          [order] = await OrderService.update({id: order.id}, {
            status: "Processing",
            checkoutUrl: payment.checkout_link,
          });

          return res.status(200).json(await order.format());
        } catch (err) {
            next(err);
        }
    }
  };
};
