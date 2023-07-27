const jwt = require("jsonwebtoken");

module.exports = () => {
  return (req, res, next) => {
    try {
      if (!req.headers.authorization) {
        return res.sendStatus(401);
      }
      const [type, token] = req.headers.authorization.split(" ");
      if (type !== "Bearer") {
        return res.sendStatus(401);
      }
      const data = jwt.verify(token, process.env.PAYLESS_SECRET_KEY);
      req.payment = data.payment;
      req.paymentStatus = data.status;

      next();
    } catch (err) {
      console.error(err);
      return res.sendStatus(401);
    }
  };
};
