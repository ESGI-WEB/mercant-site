const { Router } = require("express");

module.exports = function (userService) {
  const router = Router();

  router.post("/login", async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = await userService.findByEmail(email);

      if (!user || !user.checkPassword(password)) {
        return res.sendStatus(401);
      }

      res.json({ token: await user.generateToken() });
    } catch(error) {
      next(error)
    }
  });

  router.post("/register", async (req, res, next) => {
    const { firstname, lastname, email, password } = req.body;

    try {
      const existingUser = await userService.findByEmail(email);

      if (existingUser) {
        return res.sendStatus(409);
      }

      const newUser = await userService.create({ firstname, lastname, email, password });
      res.status(201).json({ token: await newUser.generateToken() });
    } catch (error) {
      next(error)
    }
  });

  return router;
};
