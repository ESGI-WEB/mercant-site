const { Router } = require("express");
const checkAuth = require("../middlewares/check-auth");

module.exports = function (Controller, options) {
  const router = Router();

  router.get("/", checkAuth('Administrator'), Controller.cget);
  // TODO get route for user not admin
  router.post("/", Controller.post);
  router.get("/:id", Controller.get);
  router.put("/:id", Controller.put);
  router.patch("/:id", Controller.patch);
  router.delete("/:id", checkAuth("Administrator"), Controller.delete);
  router.post("/:userId/find-or-create", checkAuth(), Controller.firstOrCreate)

  router.get("/:id/products", Controller.getProducts);
  router.post("/:id/product", Controller.addProduct);
  router.delete("/:id/product/:productId", Controller.removeProduct);
  router.patch("/:id/product/:productId", Controller.editProduct);

  router.get("/:id/refund", Controller.getRefund);
  router.post("/:id/refund", checkAuth("Administrator"), Controller.addRefund);

  return router;
};
