const orderService = require('../services/order');

module.exports = (status = null) => {
    return async (req, res, next) => {
        try {
            if (!req.user) { // provided by auth middleware
                return res.sendStatus(401);
            }
            const orderId = parseInt(req.params.id);
            const order = await orderService.findById(orderId);
            if (!order) {
                return res.sendStatus(404);
            }

            if (req.user.role !== 'admin' && req.user.id !== order.UserId) {
                return res.sendStatus(403);
            }

            if (status && order.status !== status) {
                return res.sendStatus(403);
            }

            req.order = order;

            next();
        } catch (err) {
            return res.sendStatus(401);
        }
    };
};
