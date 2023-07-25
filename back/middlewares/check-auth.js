const jwt = require("jsonwebtoken");

module.exports = (role = null) => {
  return (req, res, next) => {
    try {
      if (!req.headers.authorization) {
        return res.sendStatus(401);
      }
      const [type, token] = req.headers.authorization.split(" ");
      if (type !== "Bearer") {
        return res.sendStatus(401);
      }
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
      if (role && req.user.role !== role) {
        console.log(role)
        return res.sendStatus(403);
      }
      next();
    } catch (err) {
      return res.sendStatus(401);
    }
  };
};
