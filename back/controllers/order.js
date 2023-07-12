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
        const users = await OrderService.findAll(criteria, {
          offset: (_page - 1) * _itemsPerPage,
          limit: _itemsPerPage,
          order: _sort,
        });
        res.json(users);
      } catch (err) {
        next(err);
      }
    },
    post: async (req, res, next) => {
      try {
        const user = await OrderService.create(req.body);
        res.status(201).json(user);
      } catch (err) {
        next(err);
      }
    },
    get: async (req, res, next) => {
      try {
        const user = await OrderService.findById(parseInt(req.params.id));
        if (!user) return res.sendStatus(404);
        res.json(user);
      } catch (err) {
        next(err);
      }
    },
    put: async (req, res, next) => {
      try {
        const nbRemoved = await OrderService.remove({ id: parseInt(req.params.id) });
        const user = await OrderService.create({
          id: parseInt(req.params.id),
          ...req.body,
        });
        res.status(nbRemoved ? 200 : 201).json(user);
      } catch (err) {
        next(err);
      }
    },
    patch: async (req, res, next) => {
      try {
        const [user] = await OrderService.update(
          { id: parseInt(req.params.id) },
          req.body
        );
        if (!user) return res.sendStatus(404);
        res.json(user);
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
        const orderId = req.params.id;
        const { ProductId, quantity } = req.body;
        const orderDetails = OrderDetailsService.create(orderId, ProductId, quantity)

        const product = await ProductService.findById(ProductId)
        const newTotalPrice = product.dataValues.price * quantity;
        const order = await OrderService.findById(orderId);
        await order.increment({totalPrice: newTotalPrice});

        res.status(201).json(orderDetails);
      } catch (err) {
        next(err);
      }
    },
    removeProduct: async (req, res, next) => {
      try {
        const nbRemoved = await OrderDetailsService.remove({ productId: parseInt(req.params.productId) });
        res.sendStatus(nbRemoved ? 204 : 404);
      } catch (err) {
        next(err);
      }
    },
  };
};
