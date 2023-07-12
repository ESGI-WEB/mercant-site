const {Order} = require("../db");
module.exports = function (OrderService, OrderDetailsService, ProductService) {
  return {
    cget: async (req, res, next) => {
      const {
        _page = 1,
        _itemsPerPage = 10,
        _sort = {},
        ...criteria
      } = req.query;
      try {
        const orders = await OrderService.findAll(criteria, {
          offset: (_page - 1) * _itemsPerPage,
          limit: _itemsPerPage,
          order: _sort,
        });
        res.json(orders);
      } catch (err) {
        next(err);
      }
    },
    post: async (req, res, next) => {
      try {
        const order = await OrderService.create(req.body);
        res.status(201).json(order);
      } catch (err) {
        next(err);
      }
    },
    get: async (req, res, next) => {
      try {
        const order = await OrderService.findById(parseInt(req.params.id));
        if (!order) return res.sendStatus(404);
        res.json(order);
      } catch (err) {
        next(err);
      }
    },
    put: async (req, res, next) => {
      try {
        const nbRemoved = await OrderService.remove({ id: parseInt(req.params.id) });
        const order = await OrderService.create({
          id: parseInt(req.params.id),
          ...req.body,
        });
        res.status(nbRemoved ? 200 : 201).json(order);
      } catch (err) {
        next(err);
      }
    },
    patch: async (req, res, next) => {
      try {
        const [order] = await OrderService.update(
          { id: parseInt(req.params.id) },
          req.body
        );
        if (!order) return res.sendStatus(404);
        res.json(order);
      } catch (err) {
        next(err);
      }
    },
    delete: async (req, res, next) => {
      try {
        const nbRemoved = await OrderService.remove({ id: parseInt(req.params.id) });
        res.sendStatus(nbRemoved ? 204 : 404);
      } catch (err) {
        next(err);
      }
    },
    addProduct: async (req, res, next) => {
      try {
        const orderId = parseInt(req.params.id);
        const { ProductId, quantity } = req.body;
        const orderDetails = await OrderDetailsService.create(orderId, ProductId, quantity);

        if (orderDetails) {
          const product = await ProductService.findById(ProductId);
          const addToPrice = product.price * quantity;
          const order = await OrderService.findById(orderId);
          await order.increment({ totalPrice: addToPrice });

          res.status(201).json(orderDetails);
        } else {
          res.status(404).json({ error: 'Order not found' });
        }
      } catch (err) {
        next(err);
      }
    },
    removeProduct: async (req, res, next) => {
      try {
        const productId = parseInt(req.params.productId);
        const orderId = parseInt(req.params.id);
        const [ orderDetails ] = await OrderDetailsService.findByOrderIdAndProductId(orderId, productId);
        const nbRemoved = await OrderDetailsService.remove({ productId });

        if (nbRemoved) {
          const product = await ProductService.findById(productId)
          const order = await OrderService.findById(orderId);
          const removeToPrice = product.price * orderDetails.quantity;
          await order.decrement({ totalPrice: removeToPrice });

          res.sendStatus(204);
        } else {
          res.sendStatus(404);
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
        const orderDetails = await OrderDetailsService.findByOrderId(req.params.id);
        const productIds = orderDetails.map(order => order.productId);
        const productPromises = productIds.map(productId => ProductService.findById(productId));
        const products = await Promise.all(productPromises);

        res.json(products);
      } catch (err) {
        next(err);
      }
    }
  };
};
