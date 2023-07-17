const { Router } = require("express");
const multer = require('../middlewares/multer-config');
const checkAuth = require("../middlewares/check-auth");

module.exports = function (Controller, options) {
  const router = Router();

  router.get("/", Controller.cget);
  router.post("/", checkAuth('Administrator'), multer, Controller.post);
  router.get("/:id", Controller.get);
  router.put("/:id", checkAuth('Administrator'), multer, Controller.put);
  router.patch("/:id", checkAuth('Administrator'), Controller.patch);
  router.delete("/:id", checkAuth('Administrator'), Controller.delete);

  return router;
};
